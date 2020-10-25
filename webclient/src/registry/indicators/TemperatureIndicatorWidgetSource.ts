import { store } from '../../app/store';
import { AsTemperature } from '../genericConverters';
import { RegistryElement } from '../RegistryElement';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';

export class TemperatureIndicatorWidgetSource implements IndicatorWidgetSource, RegistryElement {
    id : string
    deviceId : string
    temperatureConverterId : string

    constructor(id:string, deviceId:string, temperatureConverterId:string) {
        this.id = id;
        this.deviceId = deviceId;
        this.temperatureConverterId = temperatureConverterId;
    } 
    getId(): string {
        return this.id;
    }
    protected getDevice() {
        return store.getState().devices.map.get(this.deviceId);
    }
    protected getTemperatureConverter() {
        return store.getState().registry.map.get(
            this.temperatureConverterId) as any as AsTemperature;
    }

    protected getTemperature() : number | null {
        let device = this.getDevice();
        let converter = this.getTemperatureConverter();

        if (!device || !converter) {
            return null;
        }

        let value = converter.getTemperature(device); 
        return value;
    }

    public getText() : string {
        let value = this.getTemperature();
        const ret =  value ? value.toFixed(1) + "&deg;" : "";
        return ret; 
    }

    public getValue() : string | null{
        let value = this.getTemperature();
        if (value !== null)
            return value.toFixed(1);
        else
            return  null; 
    }

    public getIsUpToDate() : boolean {
        return true;
    }  
}
