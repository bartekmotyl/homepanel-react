import { toNumber } from "../../../../utils/conversionUtils"
import { ConnectedDeviceBase } from "../../../Device"
import { Humidity, Temperature } from "../../../interfaces/generic/genericDevices"

export class XiaomiTemperatureSensorDevice extends ConnectedDeviceBase implements  Temperature, Humidity {
  getTemperature(): number | null {
    return toNumber(this.data?.temperature)
  }
  getHumidity(): number | null {
    return toNumber(this.data?.humidity)
  }
}