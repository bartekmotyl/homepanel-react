import { ConnectedDeviceBase } from "../../Device"
import { Switch  } from "../../interfaces/generic/genericDevices"
import { store } from '../../../app/store'

export class SwitchDevice extends ConnectedDeviceBase implements  Switch {
  toggle(): void {
    store.dispatch({ type: `connector/${this.connectorId}/device/switch/toggle`, payload: {
      deviceId: this.deviceId,
    }})
  }
  off(): void {
  }
  on(): void {
  }
  getState(): boolean | null {
    return this.data?.state
  }
}