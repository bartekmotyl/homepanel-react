import { store } from '../../app/store';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { GiTap } from 'react-icons/gi';
import { IconType } from 'react-icons/lib';
import { ValueClass } from '../classifiers/ValueClassifier';
import { ConnectedDevice } from '../../devices/Device';

export class WaterMeterIndicatorWidgetSource extends IndicatorWidgetSource {
    private subDeviceId : string

    constructor(deviceId: string, name: string, subDeviceId: string)  {
        super(deviceId, name);
        this.subDeviceId = subDeviceId;
    }
    
    private getDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.subDeviceId)! as ConnectedDevice
    }

    private getCompositeValue(): CompositeValue {
        return this.getDevice() as any as CompositeValue;     
    }

    private getState() : boolean | null{
        return this.getCompositeValue()?.getValue("state");
    }

    private getCurrentValue() : number | null {
        return this.getCompositeValue()?.getValue("total");
    }

    private getValueMinute() : number | null{
        return this.getCompositeValue()?.getValue("minute");
    }
    
    public getMdIcon() : IconType {
        return GiTap;
    }

    public getExtraText1() : string {
        let value = this.getCurrentValue();
        if (value !== null && typeof value === 'number')
            return value.toFixed();
        else 
            return "";  
    }

    public getExtraText2() : string {
        let valueMinute = this.getValueMinute();
        if (valueMinute !== null && typeof valueMinute === 'number')
            return valueMinute.toFixed();
        else 
            return "";  
    }

    public getColor() : string | null{
        if (this.getState())
            return ValueClass.Warning;
        else 
            return ValueClass.Normal; 
    }

    public getIsUpToDate() : boolean { 
        return  this.getDevice().isUpToDate()
    }

}
