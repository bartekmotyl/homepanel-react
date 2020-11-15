import { IconType } from 'react-icons/lib';
import { store } from '../../app/store';
import { DoorSensor } from '../../devices/interfaces/generic/genericDevices';
import { IndicatorWidgetSource } from './IndicatorWidgetSource';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
import { ValueClass } from '../classifiers/ValueClassifier';
import { ConnectedDevice } from '../../devices/Device';

export class DoorSensorIndicatorWidgetSource extends IndicatorWidgetSource {
    private subDeviceId: string

    constructor(deviceId: string, name: string, subDeviceId: string)  {
        super(deviceId, name);
        this.subDeviceId = subDeviceId;
    }

    private getDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.subDeviceId)! as ConnectedDevice
    }
    private getDoorSensor(): DoorSensor {
        return this.getDevice() as any as DoorSensor;     
    }

    public getMdIcon() : IconType {
        return this.getDoorSensor().isClosed() ? AiTwotoneLock : AiTwotoneUnlock;
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
