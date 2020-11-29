import { IconType } from 'react-icons/lib';
import { store } from '../../app/store';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { FaNetworkWired } from 'react-icons/fa';
import { AvailabilityChecker } from '../../devices/interfaces/generic/genericDevices';

export class AvailabilityIndicatorWidgetSource extends IndicatorWidgetSource {
    private pingDevices: string[]

    constructor(deviceId: string, name: string, pingDevices: string[])  {
        super(deviceId, name);
        this.pingDevices = pingDevices;
    }

    private getDevices(): AvailabilityChecker[] {
        const devices = this.pingDevices.map( devId => {
            return store.getState().devices.map.get(devId)! as any as AvailabilityChecker
        });
        return devices;
    } 
    protected getAggregateState() : boolean | null {
        const devices = this.getDevices(); 
        const result = devices.every(dev => dev.isAvailable()); 
        return result; 
    }
    public getMdIcon() : IconType {
        return FaNetworkWired;
    }
    public getColor() : string | null{
        if (this.getAggregateState())
            return ValueClass.Normal;
        else 
            return ValueClass.Warning; 
    }    
    public getIsUpToDate() : boolean { 
        return true;
    }
}
