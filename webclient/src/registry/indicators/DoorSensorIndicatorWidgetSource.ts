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
    private subDeviceId: string
    private variant: DoorSensorVariant 

    constructor(deviceId: string, name: string, subDeviceId: string, variant?: DoorSensorVariant)  {
        super(deviceId, name)
        this.subDeviceId = subDeviceId
        this.variant = variant ?? DoorSensorVariant.Window
    }

    private getDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.subDeviceId)! as ConnectedDevice
    }
    private getDoorSensor(): DoorSensor {
        return this.getDevice() as any as DoorSensor;     
    }

    public getMdIcon() : string {
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
        return  this.getDevice().isUpToDate()
    }

}
