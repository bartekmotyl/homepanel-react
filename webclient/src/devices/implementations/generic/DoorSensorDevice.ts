import { Device, ConnectedDeviceBase, DeviceUpdate } from "../../Device";
import { DoorSensor  } from "../../interfaces/generic/genericDevices";

export class DoorSensorDevice extends ConnectedDeviceBase implements  DoorSensor {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  isClosed(): boolean | null {
    return this.data?.state === "closed";
  }
  acceptData(update: DeviceUpdate): Device {
    return new DoorSensorDevice(this.connectorId, this.deviceId, this.name, update.data);
  }
}