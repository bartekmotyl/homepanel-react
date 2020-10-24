import { store } from '../../app/store';
import { SimpleValue } from '../../devices/interfaces/generic/genericDevices';
import { RegistryElement } from '../RegistryElement';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { FaWater } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export class WaterMeterComplexIndicatorWidgetSource implements IndicatorWidgetSource, RegistryElement {
    id : string
    stateDeviceId : string
    valueDeviceId : string
    valueMinuteDeviceId : string
    flowState : string

    constructor(id:string, stateDeviceId:string, valueDeviceId:string, valueMinuteDeviceId:string, flowState:string) {
        this.id = id;
        this.stateDeviceId = stateDeviceId;
        this.valueDeviceId = valueDeviceId;
        this.valueMinuteDeviceId = valueMinuteDeviceId;
        this.flowState = flowState;
    }    

    public getId(): string {
        return this.id;
    }
    
    private getDevice(deviceId: string): SimpleValue {
        return store.getState().devices.map.get(deviceId) as any as SimpleValue;     
    }

    private getState() : boolean | null{
        const stateDevice = this.getDevice(this.stateDeviceId);
        if (!stateDevice)
            return null;
        if (stateDevice.getValue() === null)
            return null; 
        return  stateDevice.getValue() === this.flowState;
    }

    private getCurrentValue() : number | null {
        let valueDevice = this.getDevice(this.valueDeviceId);
        if (!valueDevice)
            return null;
        if (valueDevice.getValue() === null)
            return null; 
        return Number(valueDevice.getValue());
    }

    private getValueMinute() : number | null{
        let valueMinuteDevice = this.getDevice(this.valueMinuteDeviceId);
        if (!valueMinuteDevice)
            return null;
        if (valueMinuteDevice.getValue() === null)
            return null; 
        return Number(valueMinuteDevice.getValue());
    }
    
    public getMdIcon() : IconType {
        return FaWater;
    }

    public getExtraText1() : string {
        let value = this.getCurrentValue();
        if (value !== null)
            return value.toFixed();
        else 
            return "";  
    }

    public getExtraText2() : string {
        let valueMinute = this.getValueMinute();
        if (valueMinute !== null)
            return valueMinute.toFixed();
        else 
            return "";  
    }

    public getColor() : string | null{
        if (this.getState())
            return "yellow";
        else 
            return null; 
    }

    public getIsUpToDate() : boolean {
        return true;
    }  
}
