import { IconType } from 'react-icons/lib';
import { store } from '../../app/store';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { ConnectedDevice } from '../../devices/Device';
import { AsBoolean } from '../genericConverters';
import { AiOutlineWarning } from 'react-icons/ai';

export class WarningIndicatorWidgetSource extends IndicatorWidgetSource {
    private subDeviceId: string
    private converterId : string


    constructor(deviceId: string, name: string, subDeviceId: string, converterId : string)  {
        super(deviceId, name);
        this.subDeviceId = subDeviceId;
        this.converterId = converterId;
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

    public getMdIcon() : IconType {
        return AiOutlineWarning;
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
