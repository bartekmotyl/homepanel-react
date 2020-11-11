import { Device, ConnectedDeviceBase, DeviceUpdate } from "../../../Device";
import { RadiatorThermostatInfo } from "../../../interfaces/generic/genericDevices";

export class HPRadiatorThermostatDevice extends ConnectedDeviceBase implements  RadiatorThermostatInfo  {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  getCurrentTemperature(): number | null {
    return Number(this.data?.currentTemperature);
  }
  getDesiredTemperature(): number | null {
    return Number(this.data?.desiredTemperature);
  }
  getValvePosition(): number | null {
    return Number(this.data?.valvePosition);
  }
  acceptData(update: DeviceUpdate): Device {
    return new HPRadiatorThermostatDevice(this.connectorId, this.deviceId, this.name, update.data);
  }
}