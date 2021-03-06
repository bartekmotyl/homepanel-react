import { Device, DeviceBase } from '../../devices/Device'
import { SimpleValue } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast';
import { AsBoolean } from './genericConverters'

export class SimpleValueAsBooleanConverter extends DeviceBase implements  AsBoolean {
    private trueValue : string
    private reversed : boolean; 

    constructor(deviceClass: string, deviceId: string, name: string, trueValue: string  = "true", reversed: boolean = true)  {
        super(deviceClass, deviceId, name)
        this.trueValue = trueValue
        this.reversed = reversed
    }
    getBoolean(device: Device): boolean | null {
        let value = asInterface<SimpleValue>(this.deviceId, device).getValue()
        const result = value === this.trueValue
        return this.reversed ? !result : result; 
    }
}