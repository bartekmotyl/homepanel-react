import { store } from '../../app/store';
import { DoorSensor } from '../../devices/interfaces/generic/genericDevices';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { ValueClass } from '../classifiers/ValueClassifier';
import { ConnectedDevice } from '../../devices/Device';

enum DoorSensorVariant {
    Door, 
    Window, 
    Garage,
    Fence,
}

export class DoorSensorIndicatorWidgetSource extends IndicatorWidgetSource {
    private refDeviceId: string
    private variant: DoorSensorVariant 

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string, variant?: DoorSensorVariant)  {
        super(sourceClass, sourceId, name)
        this.refDeviceId = refDeviceId
        this.variant = variant ?? DoorSensorVariant.Window
    }

    private getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice
    }
    private getDoorSensor(): DoorSensor {
        return this.getRefDevice() as any as DoorSensor;     
    }

    public getIcon() : string {
        const isClosed = this.getDoorSensor().isClosed()
        switch(this.variant) {
            default:
                return isClosed ? "svg/small/023-window.svg" : "svg/small/019-window-4.svg"
        }
    }

    public getColor() : string | null{
        if (this.getDoorSensor().isClosed())
            return ValueClass.Normal;
        else 
            return ValueClass.Error; 
    }    

    public getIsUpToDate() : boolean { 
        return  this.getRefDevice().isUpToDate()
    }

}
