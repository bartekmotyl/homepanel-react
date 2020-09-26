import { Device, DeviceBase, DeviceUpdate } from "../../Device";
import { Switch  } from "../../interfaces/generic/genericDevices";
import { store } from '../../../app/store';

export class SwitchDevice extends DeviceBase implements  Switch {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  toggle(): void {
    store.dispatch({ type: 'connector/switch/toggle', payload: {
      deviceId: this.deviceId,
      connectorId: this.connectorId,
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