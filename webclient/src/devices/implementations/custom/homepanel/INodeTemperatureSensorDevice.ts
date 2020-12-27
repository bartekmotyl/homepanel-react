import { ConnectedDeviceBase } from "../../../Device";
import { BatteryOperated, Temperature } from "../../../interfaces/generic/genericDevices";

export class INodeTemperatureSensorDevice extends ConnectedDeviceBase implements  Temperature, BatteryOperated {
  getTemperature(): number | null {
    return this.data?.temperature
  }
  getBattery(): number | null {
    return this.data?.batteryVoltage
  }
  isBatteryOk(): boolean | null {
    return null
  }  
}