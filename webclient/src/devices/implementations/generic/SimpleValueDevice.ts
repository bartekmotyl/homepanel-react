import { Device, ConnectedDeviceBase, DeviceUpdate } from "../../Device";
import { SimpleValue } from "../../interfaces/generic/genericDevices";

export class SimpleValueDevice extends ConnectedDeviceBase implements  SimpleValue {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  acceptData(update: DeviceUpdate): Device {
    return new SimpleValueDevice(this.connectorId, this.deviceId, this.name, update.data);
  }
  getValue(): any {
    return  this.data && this.data.value;
  }
}

