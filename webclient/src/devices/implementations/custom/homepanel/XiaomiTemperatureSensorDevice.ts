import { Device, ConnectedDeviceBase, DeviceUpdate } from "../../../Device";
import { Humidity, Temperature } from "../../../interfaces/generic/genericDevices";

export class XiaomiTemperatureSensorDevice extends ConnectedDeviceBase implements  Temperature, Humidity {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  acceptData(update: DeviceUpdate): Device {
    return new XiaomiTemperatureSensorDevice(this.connectorId, this.deviceId, this.name, update.data);
  }
  getTemperature(): number | null {
    return this.data?.temperature;
  }
  getHumidity(): number | null {
    return this.data?.humidity;
  }
}