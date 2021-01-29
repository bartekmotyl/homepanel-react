import { store } from '../../app/store';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { ConnectedDevice } from '../../devices/Device';
import { AsBoolean } from '../genericConverters';

export class WarningIndicatorWidgetSource extends IndicatorWidgetSource {
    private subDeviceId: string
    private converterId : string
    private svgUrl? : string

    constructor(deviceClass: string, deviceId: string, name: string, subDeviceId: string, converterId : string, svgUrl?: string)  {
        super(deviceClass, deviceId, name);
        this.subDeviceId = subDeviceId;
        this.converterId = converterId;
        this.svgUrl = svgUrl
    }

    private getDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.subDeviceId)! as ConnectedDevice
    }

    protected getConverter() {
        return store.getState().devices.map.get(this.converterId)! as any as AsBoolean;
    }


    protected getBoolean() : boolean | null {
        let device = this.getDevice();
        let converter = this.getConverter();
        if (!device) {
            return null;
        }
        if (!converter) {
            return null; 
        }
        let value = converter.getBoolean(device); 
        return value;
    }

    public getMdIcon() : string {
        return this.svgUrl ?? "svg/small/905-warning.svg"
    }

    public getColor() : string | null{
        if (this.getBoolean())
            return ValueClass.Normal;
        else 
            return ValueClass.Warning; 
    }    

    public getIsUpToDate() : boolean { 
        const dev = this.getDevice();
        return dev.isUpToDate()
    }

}
