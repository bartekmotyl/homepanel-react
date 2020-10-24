import { IconType } from 'react-icons/lib';
import { store } from '../../app/store';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { RegistryElement } from '../RegistryElement';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { FaStopwatch } from 'react-icons/fa';

export class PowerMeterIndicatorWidgetSource implements IndicatorWidgetSource, RegistryElement {
    private id : string
    private deviceId : string

    constructor(id:string, deviceId:string) {
        this.id = id;
        this.deviceId = deviceId;
    }    
    public getId(): string {
        return this.id;
    }

    public getMdIcon() : IconType {
        return FaStopwatch;
    }
    private getDevice(deviceId: string): CompositeValue {
        return store.getState().devices.map.get(deviceId) as any as CompositeValue;     
    }
    public getExtraText1() : string {
        let device = this.getDevice(this.deviceId);
        return device.getValue("total").toFixed();
    }

    public getIsUpToDate() : boolean {
        return true;
    }  
}
