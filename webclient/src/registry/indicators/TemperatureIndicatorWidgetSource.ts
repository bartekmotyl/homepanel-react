import { store } from '../../app/store'
import { ConnectedDevice } from '../../devices/Device'
import { Temperature } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast'
import { AsTemperature } from '../converters/genericConverters'
import { IndicatorWidgetSource } from './IndicatorWidgetSource'

/**
 * TemperatureIndicatorWidgetSource takes a reference to a device (any) 
 * and also takes reference to AsTemperature converter. 
 * Value provided by this source is obtained from referenced device and converted by given converter to a number (temperature). 
 * This source requires to be combined with a value classifier as it does not return any colors.
*/
export class TemperatureIndicatorWidgetSource extends IndicatorWidgetSource {
    private temperatureConverterId : string
    protected refDeviceId : string

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string, temperatureConverterId: string)  {
        super(sourceClass, sourceId, name)
        this.refDeviceId = refDeviceId
        this.temperatureConverterId = temperatureConverterId
    }
    
    protected getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice     
    }

    protected getTemperatureConverter() {
        return asInterface<AsTemperature>(this.temperatureConverterId, store.getState().devices.map.get(this.temperatureConverterId))
    }

    protected getTemperature() : number | null {
        let device = this.getRefDevice()
        

        if (!device) {
            return null
        }
        if (!this.temperatureConverterId) {
            const temp = asInterface<Temperature>(this.refDeviceId, device)
            return temp.getTemperature()
        }
        let converter = this.getTemperatureConverter()
        let value = converter.getTemperature(device); 
        return value
    }

    public getText() : string {
        let value = this.getTemperature()
        if(value && typeof value !== 'number') {
            return `${value}`
        }
        const ret =  value ? value.toFixed(1) + "&deg;" : "N/A"
        return ret; 
    }

    public getValue() : string | null{
        let value = this.getTemperature()
        if (value !== null)
            return value.toFixed(1)
        else
            return  null; 
    }

    public getIsUpToDate() : boolean { 
        return  this.getRefDevice().isUpToDate()
    }
}
