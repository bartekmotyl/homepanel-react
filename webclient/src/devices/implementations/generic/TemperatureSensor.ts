import { Device, DeviceBase, DeviceUpdate } from "../../Device";
import { Temperature } from "../../interfaces/generic/genericDevices";

export class TemperatureSensor extends DeviceBase implements  Temperature {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  acceptData(update: DeviceUpdate): Device {
    return new TemperatureSensor(this.connectorId, this.deviceId, this.name, update.data);
  }
  getTemperature(): number | null {
    return this.data?.temperature;
  }
}