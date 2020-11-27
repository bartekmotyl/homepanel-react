import { Device, DeviceBase } from '../../devices/Device';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { AsNumber } from '../genericConverters';

export class CompositeValueAsNumberConverter extends DeviceBase implements  AsNumber {
    private property : string;

    constructor(deviceId: string, name: string, property: string  = "value")  {
        super(deviceId, name);
        this.property = property;
    }
    getNumber(device: Device): number | null {
        let value = (device as any as CompositeValue).getValue(this.property);
        return value || null;
    }
}