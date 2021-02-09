import { store } from '../../app/store';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { ConnectedDevice } from '../../devices/Device';
import { AsBoolean } from '../converters/genericConverters';

export class WarningIndicatorWidgetSource extends IndicatorWidgetSource {
    private refDeviceId: string
    private converterId : string
    private svgUrl? : string

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string, converterId : string, svgUrl?: string)  {
        super(sourceClass, sourceId, name);
        this.refDeviceId = refDeviceId;
        this.converterId = converterId;
        this.svgUrl = svgUrl
    }

    private getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice
    }

    protected getConverter() {
        return store.getState().devices.map.get(this.converterId)! as any as AsBoolean;
    }


    protected getBoolean() : boolean | null {
        let device = this.getRefDevice();
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

    public getIcon() : string {
        return this.svgUrl ?? "svg/small/905-warning.svg"
    }

    public getColor() : string | null{
        if (this.getBoolean())
            return ValueClass.Normal;
        else 
            return ValueClass.Warning; 
    }    

    public getIsUpToDate() : boolean { 
        const dev = this.getRefDevice();
        return dev.isUpToDate()
    }

}
