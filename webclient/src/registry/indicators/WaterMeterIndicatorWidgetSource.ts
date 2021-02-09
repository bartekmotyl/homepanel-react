import { store } from '../../app/store';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { ConnectedDevice } from '../../devices/Device';

export class WaterMeterIndicatorWidgetSource extends IndicatorWidgetSource {
    private refDeviceId : string

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string)  {
        super(sourceClass, sourceId, name);
        this.refDeviceId = refDeviceId;
    }
    
    private getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice
    }

    private getCompositeValue(): CompositeValue {
        return this.getRefDevice() as any as CompositeValue;     
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
    
    public getIcon() : string {
        return "svg/small/010-water.svg"
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
        return  this.getRefDevice().isUpToDate()
    }

}
