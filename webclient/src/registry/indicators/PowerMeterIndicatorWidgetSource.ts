import { IconType } from 'react-icons/lib';
import { store } from '../../app/store';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ImPower } from 'react-icons/im';

export class PowerMeterIndicatorWidgetSource extends IndicatorWidgetSource {
    private subDeviceId: string

    constructor(deviceId: string, name: string, subDeviceId: string)  {
        super(deviceId, name);
        this.subDeviceId = subDeviceId;
    }

    private getCompositeValue(): CompositeValue {
        return store.getState().devices.map.get(this.subDeviceId)! as any as CompositeValue;     
    }


    public getMdIcon() : IconType {
        return ImPower;
    }

    public getExtraText1() : string {
        let cv = this.getCompositeValue();
        return cv.getValue("total")?.toFixed();
    }

    public getValue(): number {
        let cv = this.getCompositeValue();
        let value = Number(cv.getValue("minute")) * 60;
        return value; 
    }


    public getName(): string {
        return `${super.getName()}<br/>${this.getValue() || '?'} W`
    }
}
