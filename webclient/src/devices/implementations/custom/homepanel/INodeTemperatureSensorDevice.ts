import { toNumber } from "../../../../utils/conversionUtils"
import { ConnectedDeviceBase } from "../../../Device"
import { BatteryOperated, Temperature } from "../../../interfaces/generic/genericDevices"

export class INodeTemperatureSensorDevice extends ConnectedDeviceBase implements  Temperature, BatteryOperated {
  getTemperature(): number | null {
    return toNumber(this.data?.temperature)
  }
  getBattery(): number | null {
    return toNumber(this.data?.batteryVoltage)
  }
  isBatteryOk(): boolean | null {
    return null
  }  
}