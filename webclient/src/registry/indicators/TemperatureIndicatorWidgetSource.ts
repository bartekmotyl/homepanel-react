import { store } from '../../app/store';
import { ConnectedDevice } from '../../devices/Device';
import { Temperature } from '../../devices/interfaces/generic/genericDevices';
import { AsTemperature } from '../genericConverters';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';


export class TemperatureIndicatorWidgetSource extends IndicatorWidgetSource {
    private temperatureConverterId : string
    private subDeviceId : string

    constructor(deviceClass: string, deviceId: string, name: string, subDeviceId: string, temperatureConverterId: string)  {
        super(deviceClass, deviceId, name);
        this.subDeviceId = subDeviceId;
        this.temperatureConverterId = temperatureConverterId;
    }
    
    protected getSubDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.subDeviceId)! as ConnectedDevice     
    }

    protected getTemperatureConverter() {
        return store.getState().devices.map.get(this.temperatureConverterId)! as any as AsTemperature;
    }

    protected getTemperature() : number | null {
        let device = this.getSubDevice();
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
        if(typeof value !== 'number') {
            return `${value}`
        }
        const ret =  value ? value.toFixed(1) + "&deg;" : "";
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
        return  this.getSubDevice().isUpToDate()
    }
}
