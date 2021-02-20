import { store } from '../../app/store'
import { IndicatorWidgetSource } from './IndicatorWidgetSource'
import { ValueClass } from '../classifiers/ValueClassifier'
import { AvailabilityChecker } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast'

/**
 * AvailabilityIndicatorWidgetSource takes array of AvailabilityChecker and shows warning icon 
 * if any of them returns "not available". Can be used e.g. with PingDevice. 
 * This source does not require to be combined with value classifier as it returns proper color on its own.
 */
export class AvailabilityIndicatorWidgetSource extends IndicatorWidgetSource {
    private refDeviceIds: string[]

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceIds: string[])  {
        super(sourceClass, sourceId, name)
        this.refDeviceIds = refDeviceIds
    }

    private getRefDevices(): AvailabilityChecker[] {
        const devices = this.refDeviceIds.map( devId => {
            return asInterface<AvailabilityChecker>(devId, store.getState().devices.map.get(devId))
        })
        return devices
    } 
    protected getAggregateState() : boolean | null {
        const devices = this.getRefDevices(); 
        const result = devices.every(dev => dev.isAvailable()); 
        return result; 
    }
    public getIcon() : string {
        return "svg/small/905-warning.svg"
    }
    public getColor() : string | null{
        if (this.getAggregateState())
            return ValueClass.Normal
        else 
            return ValueClass.Warning; 
    }    
    public getIsUpToDate() : boolean { 
        return true
    }
}
