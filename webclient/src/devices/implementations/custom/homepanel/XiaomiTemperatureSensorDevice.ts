import { ConnectedDeviceBase } from "../../../Device";
import { Humidity, Temperature } from "../../../interfaces/generic/genericDevices";

export class XiaomiTemperatureSensorDevice extends ConnectedDeviceBase implements  Temperature, Humidity {
  getTemperature(): number | null {
    return this.data?.temperature;
  }
  getHumidity(): number | null {
    return this.data?.humidity;
  }
}