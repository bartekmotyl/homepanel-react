import { Device, DeviceBase, DeviceUpdate } from "../../../Device";
import { Humidity, Temperature } from "../../../interfaces/generic/genericDevices";

export class XiaomiTemperatureSensor extends DeviceBase implements  Temperature, Humidity {
  constructor(deviceId: string, name: string, data = undefined) {
    super(deviceId, name, data);
  }
  acceptData(update: DeviceUpdate): Device {
    return new XiaomiTemperatureSensor(this.deviceId, this.name, update.data);
  }
  getTemperature(): number | null {
    return this.data?.temperature;
  }
  getHumidity(): number | null {
    return this.data?.humidity;
  }
}