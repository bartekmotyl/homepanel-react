import { ConnectedDeviceBase, Device, DeviceUpdate } from "../../Device";
import { Blinds } from "../../interfaces/generic/genericDevices";
import { store } from '../../../app/store';

export class BlindsDevice extends ConnectedDeviceBase implements  Blinds {
  constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
    super(connectorId, deviceId, name, data);
  }
  
  _dispatchMove(type: string): void {
    store.dispatch({ type: `connector/${this.connectorId}/device/blinds/${type}`, payload: {
      deviceId: this.deviceId,
    }});
  }

  up(): void {
    this._dispatchMove("up");
  }
  down(): void {
    this._dispatchMove("down");
  }
  stepUp(): void {
    this._dispatchMove("stepUp");
  }
  stepDown(): void{
    this._dispatchMove("stepDown");
  }
  stop(): void{
    this._dispatchMove("stop");
  }
  acceptData(update: DeviceUpdate): Device {
    return new BlindsDevice(this.connectorId, this.deviceId, this.name, update.data);
  }
}