import { store } from '../../app/store';
import { ConnectedDevice } from '../../devices/Device';
import { Temperature } from '../../devices/interfaces/generic/genericDevices';
import { AsTemperature } from '../converters/genericConverters';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';


export class TemperatureIndicatorWidgetSource extends IndicatorWidgetSource {
    private temperatureConverterId : string
    private refDeviceId : string

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string, temperatureConverterId: string)  {
        super(sourceClass, sourceId, name);
        this.refDeviceId = refDeviceId;
        this.temperatureConverterId = temperatureConverterId;
    }
    
    protected getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice     
    }

    protected getTemperatureConverter() {
        return store.getState().devices.map.get(this.temperatureConverterId)! as any as AsTemperature;
    }

    protected getTemperature() : number | null {
        let device = this.getRefDevice();
        let converter = this.getTemperatureConverter();

        if (!device) {
            return null;
        }
        if (!converter) {
            const temp = device as any as Temperature
            return temp.getTemperature()
        }

        let value = converter.getTemperature(device); 
        return value;
    }

    public getText() : string {
        let value = this.getTemperature()
        if(value && typeof value !== 'number') {
            return `${value}`
        }
        const ret =  value ? value.toFixed(1) + "&deg;" : "N/A";
        return ret; 
    }

    public getValue() : string | null{
        let value = this.getTemperature()
        if (value !== null)
            return value.toFixed(1);
        else
            return  null; 
    }

    public getIsUpToDate() : boolean { 
        return  this.getRefDevice().isUpToDate()
    }
}
