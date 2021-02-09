import { store } from '../../app/store';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ConnectedDevice } from '../../devices/Device';

export class PowerMeterIndicatorWidgetSource extends IndicatorWidgetSource {
    private refDeviceId: string

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


    public getIcon() : string {
        return "svg/small/014-plug.svg"
    }

    public getExtraText1() : string {
        let cv = this.getCompositeValue();
        let value = cv.getValue("total")
        if (value !== null && typeof value === 'number')
            return (value /1000).toFixed() ;
        else 
            return value;  
    }

    public getValue(): number {
        let cv = this.getCompositeValue();
        let value = Number(cv.getValue("minute")) * 60;
        return value; 
    }


    public getName(): string {
        return `${super.getName()}<br/>${this.getValue() || '?'} W`
    }

    public getIsUpToDate() : boolean { 
        return  this.getRefDevice().isUpToDate()
    }
}
