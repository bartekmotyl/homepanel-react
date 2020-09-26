import { Device, DeviceBase, DeviceUpdate } from "../../Device";
import { Switch  } from "../../interfaces/generic/genericDevices";

export class SwitchDevice extends DeviceBase implements  Switch {
  constructor(deviceId: string, name: string, data = undefined) {
    super(deviceId, name, data);
  }
  toggle(): void {
  }
  off(): void {
  }
  on(): void {
  }
  getState(): boolean | null {
    return this.data?.state;
  }
  acceptData(update: DeviceUpdate): Device {
    return new SwitchDevice(this.deviceId, this.name, update.data);
  }
}