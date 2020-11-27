import { store } from '../../app/store';
import { ConnectedDevice } from '../../devices/Device';
import { AsNumber  } from '../genericConverters';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';

export class NumberIndicatorWidgetSource extends IndicatorWidgetSource {
    private converterId : string
    private subDeviceId : string

    constructor(deviceId: string, name: string, subDeviceId: string, converterId: string)  {
        super(deviceId, name);
        this.subDeviceId = subDeviceId;
        this.converterId = converterId;
    }
    
    protected getSubDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.subDeviceId)! as ConnectedDevice     
    }

    protected getConverter() {
        return store.getState().devices.map.get(this.converterId)! as any as AsNumber;
    }

    protected getNumber() : number | null {
        let device = this.getSubDevice();
        let converter = this.getConverter();

        if (!device) {
            return null;
        }

        let value = converter.getNumber(device); 
        return value;
    }

    public getText() : string {
        let value = this.getNumber()
        if(typeof value !== 'number') {
            return `${value}`
        }
        const ret =  value ? value.toFixed(1) : "";
        return ret; 
    }

    public getValue() : string | null{
        let value = this.getNumber()
        if (value !== null)
            return value.toFixed(1);
        else
            return  null; 
    }

    public getIsUpToDate() : boolean { 
        return  this.getSubDevice().isUpToDate()
    }
}
