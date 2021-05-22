import { store } from '../../app/store'
import { ConnectedDevice } from '../../devices/Device'
import { WindSensor } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast'
import { IndicatorWidgetSource } from './IndicatorWidgetSource'


export class WindIndicatorWidgetSource extends IndicatorWidgetSource {
    protected refDeviceId : string

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string)  {
        super(sourceClass, sourceId, name)
        this.refDeviceId = refDeviceId
    }
    
    protected getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice     
    }
    private getWindSensor(): WindSensor {
        return asInterface<WindSensor>(this.refDeviceId, this.getRefDevice())
    }

    public getText() : string {
        let value = this.getWindSensor().getWindSpeedMetersSecond()
        if(value && typeof value !== 'number') {
            return `${value}`
        }
        const ret =  value || value === 0 ? value.toFixed(1) : "N/A"
        return ret; 
    }

    public getValue() : string | null{
        let value = this.getWindSensor().getWindSpeedMetersSecond()
        if (value !== null)
            return value.toFixed(1)
        else
            return  null; 
    }

    public getIsUpToDate() : boolean { 
        const refDev = this.getRefDevice()
        if (!refDev) { 
            debugger
        }
        return  this.getRefDevice().isUpToDate()
    }
}
