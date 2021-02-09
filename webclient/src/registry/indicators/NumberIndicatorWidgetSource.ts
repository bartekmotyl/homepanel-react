import { store } from '../../app/store';
import { ConnectedDevice } from '../../devices/Device';
import { AsNumber  } from '../converters/genericConverters';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';

export class NumberIndicatorWidgetSource extends IndicatorWidgetSource {
    private converterId : string
    private refDeviceId : string

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string, converterId: string)  {
        super(sourceClass, sourceId, name);
        this.refDeviceId = refDeviceId;
        this.converterId = converterId;
    }
    
    protected getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice     
    }

    protected getConverter() {
        return store.getState().devices.map.get(this.converterId)! as any as AsNumber;
    }

    protected getNumber() : number | null {
        let device = this.getRefDevice();
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
        return  this.getRefDevice().isUpToDate()
    }
}
