import { store } from '../../app/store';
import { AsTemperature } from '../genericConverters';
import { RegistryElement } from '../RegistryElement';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';

export class TemperatureIndicatorWidgetSource implements IndicatorWidgetSource, RegistryElement {
    private id : string
    private deviceId : string
    private temperatureConverterId : string
    private title: string

    constructor(id:string, title: string, deviceId:string, temperatureConverterId:string) {
        this.id = id;
        this.title = title;        
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

    public getTitle(): string {
        return this.title;
    }    
}
