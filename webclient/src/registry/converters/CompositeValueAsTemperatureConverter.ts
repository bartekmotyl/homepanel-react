import { Device, DeviceBase } from '../../devices/Device'
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast'
import { AsTemperature } from './genericConverters'

export class CompositeValueAsTemperatureConverter extends DeviceBase implements  AsTemperature {
    private property : string

    constructor(deviceClass: string, deviceId: string, name: string, property: string  = "temperature")  {
        super(deviceClass, deviceId, name)
        this.property = property
    }
    getTemperature(device: Device): number | null {
        let value = asInterface<CompositeValue>(this.deviceId, device).getValue(this.property)
        return value || null
    }
}