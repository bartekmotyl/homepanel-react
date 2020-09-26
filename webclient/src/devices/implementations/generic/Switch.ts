import { Device, DeviceBase, DeviceUpdate } from "../../Device";
import { Switch  } from "../../interfaces/generic/genericDevices";
import { store } from '../../../app/store';

export class SwitchDevice extends DeviceBase implements  Switch {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  toggle(): void {
    store.dispatch({ type: `connector/${this.connectorId}/device/switch/toggle`, payload: {
      deviceId: this.deviceId,
    }});
  }
  off(): void {
  }
  on(): void {
  }
  getState(): boolean | null {
    return this.data?.state;
  }
  acceptData(update: DeviceUpdate): Device {
    return new SwitchDevice(this.connectorId, this.deviceId, this.name, update.data);
  }
}