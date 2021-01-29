import { store } from '../../app/store';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { AvailabilityChecker } from '../../devices/interfaces/generic/genericDevices';

export class AvailabilityIndicatorWidgetSource extends IndicatorWidgetSource {
    private pingDevices: string[]

    constructor(deviceClass: string, deviceId: string, name: string, pingDevices: string[])  {
        super(deviceClass, deviceId, name);
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
    public getMdIcon() : string {
        return "svg/small/905-warning.svg"
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
