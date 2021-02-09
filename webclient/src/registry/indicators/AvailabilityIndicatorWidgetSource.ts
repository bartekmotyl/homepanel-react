import { store } from '../../app/store';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { AvailabilityChecker } from '../../devices/interfaces/generic/genericDevices';

export class AvailabilityIndicatorWidgetSource extends IndicatorWidgetSource {
    private refDeviceIds: string[]

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceIds: string[])  {
        super(sourceClass, sourceId, name);
        this.refDeviceIds = refDeviceIds;
    }

    private getRefDevices(): AvailabilityChecker[] {
        const devices = this.refDeviceIds.map( devId => {
            return store.getState().devices.map.get(devId)! as any as AvailabilityChecker
        });
        return devices;
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
            return ValueClass.Normal;
        else 
            return ValueClass.Warning; 
    }    
    public getIsUpToDate() : boolean { 
        return true;
    }
}
