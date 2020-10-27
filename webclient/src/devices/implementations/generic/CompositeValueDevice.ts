import { Device, ConnectedDeviceBase, DeviceUpdate } from "../../Device";
import { CompositeValue } from "../../interfaces/generic/genericDevices";

export class CompositeValueDevice extends ConnectedDeviceBase implements  CompositeValue {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  acceptData(update: DeviceUpdate): Device {
    return new CompositeValueDevice(this.connectorId, this.deviceId, this.name, update.data);
  }
  getValue(property: string): any {
    return  this.data && this.data[property];
  }
}

