import { toNumber } from "../../../utils/conversionUtils"
import { ConnectedDeviceBase } from "../../Device"
import { Temperature } from "../../interfaces/generic/genericDevices"

export class TemperatureSensorDevice extends ConnectedDeviceBase implements  Temperature {
  getTemperature(): number | null {
    return toNumber(this.data?.temperature)
  }
}