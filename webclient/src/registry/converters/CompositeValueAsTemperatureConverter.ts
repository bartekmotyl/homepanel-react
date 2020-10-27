import { Device, DeviceBase, DeviceUpdate } from '../../devices/Device';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { AsTemperature } from '../genericConverters';

export class CompositeValueAsTemperatureConverter extends DeviceBase implements  AsTemperature {
    private property : string;

    constructor(deviceId: string, name: string, property: string  = "temperature")  {
        super('', deviceId, name);
        this.property = property;
    }
    acceptData(update: DeviceUpdate): Device {
        return this
    }
    getTemperature(device: Device): number | null {
        let value = (device as any as CompositeValue).getValue(this.property);
        return value || null;
    }
}