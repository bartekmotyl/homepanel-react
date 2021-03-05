import { Device, DeviceBase } from '../../devices/Device'
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast'
import { toNumber } from '../../utils/conversionUtils'
import { AsNumber } from './genericConverters'

export class CompositeValueAsNumberConverter extends DeviceBase implements  AsNumber {
    private property : string

    constructor(deviceClass: string, deviceId: string, name: string, property: string  = "value")  {
        super(deviceClass, deviceId, name)
        this.property = property
    }
    getNumber(device: Device): number | null {
        let value = asInterface<CompositeValue>(this.deviceId, device).getValue(this.property)
        return toNumber(value)
    }
}