import { ConnectedDeviceBase } from "../../Device";
import { Temperature } from "../../interfaces/generic/genericDevices";

export class TemperatureSensorDevice extends ConnectedDeviceBase implements  Temperature {
  getTemperature(): number | null {
    return this.data?.temperature;
  }
}