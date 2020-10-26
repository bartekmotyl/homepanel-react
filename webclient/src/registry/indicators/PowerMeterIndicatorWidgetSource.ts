import { IconType } from 'react-icons/lib';
import { store } from '../../app/store';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { RegistryElement } from '../RegistryElement';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ImPower } from 'react-icons/im';

export class PowerMeterIndicatorWidgetSource implements IndicatorWidgetSource, RegistryElement {
    private id : string
    private deviceId : string
    private title: string

    constructor(id:string, title: string, deviceId:string) {
        this.id = id;
        this.title = title;
        this.deviceId = deviceId;
    }    
    public getId(): string {
        return this.id;
    }

    public getMdIcon() : IconType {
        return ImPower;
    }
    private getDevice(deviceId: string): CompositeValue {
        return store.getState().devices.map.get(deviceId) as any as CompositeValue;     
    }
    public getExtraText1() : string {
        let device = this.getDevice(this.deviceId);
        return device.getValue("total")?.toFixed();
    }

    public getIsUpToDate() : boolean {
        return true;
    }  

    public getValue(): number {
        let device = this.getDevice(this.deviceId);
        let value = Number(device.getValue("minute")) * 60;
        return value; 
    }


    public getTitle(): string {
        const currVal = this.getValue()
        return `${this.title}<br/>${currVal || '?'} W`
    }
}
