import { Device, DeviceUpdate } from "../../device";
import { Humidity, Temperature } from "../../interfaces/genericDevices";

export class XiaomiTemperatureSensor implements Device, Temperature, Humidity {
  deviceId: string;
  data: any; 

  constructor(deviceId: string, data = undefined) {
    this.deviceId = deviceId;
    this.data = data;
  }
  acceptData(update: DeviceUpdate): Device {
    return new XiaomiTemperatureSensor(this.deviceId, update.data);
  }
  getTemperature(): number | null {
    return this.data?.temperature;
  }
  getHumidity(): number | null {
    return this.data?.humidity;
  }
  getDeviceId(): string {
    return this.deviceId;
  }
  dump(): string {
    return JSON.stringify(this.data);
  }
}