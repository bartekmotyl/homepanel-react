import { store } from "../../../../app/store"
import { ConnectedDeviceBase } from "../../../Device"

export class HABaseDevice extends ConnectedDeviceBase {
  setHAPayload(value: any) {
    this.data.state = value
  }
  dispatchAction(deviceType: string, command: any): void {
    store.dispatch({
      type: `connector/${this.connectorId}/device/${deviceType}`,
      payload: {
        deviceId: this.deviceId,
        command,
      },
    })
  }
}
