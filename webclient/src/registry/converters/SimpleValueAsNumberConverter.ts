import { Device, DeviceBase } from "../../devices/Device"
import { SimpleValue } from "../../devices/interfaces/generic/genericDevices"
import { asInterface } from "../../utils/cast"
import { AsNumber } from "./genericConverters"

export class SimpleValueAsNumberConverter
  extends DeviceBase
  implements AsNumber
{
  getNumber(device: Device): number | null {
    let value = asInterface<SimpleValue>(this.deviceId, device).getValue()
    const result = parseFloat(value)
    return result
  }
}
