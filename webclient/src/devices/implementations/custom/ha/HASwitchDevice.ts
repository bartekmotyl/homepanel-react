import { Switch } from "../../../interfaces/generic/genericDevices"
import { HABaseDevice } from "./HABaseDevice"

export class HASwitchDevice extends HABaseDevice implements Switch {
  private domain: string

  constructor(
    deviceClass: string,
    connectorId: string,
    deviceId: string,
    name: string,
    domain?: string
  ) {
    super(deviceClass, connectorId, deviceId, name)
    this.domain = domain ?? "light"
  }

  protected getDomain() {
    console.log("domain: " + this.domain)
    return this.domain
  }

  dispatchChange(state: boolean) {
    const command = {
      type: "call_service",
      domain: this.getDomain(),
      service: state ? "turn_on" : "turn_off",
      service_data: { entity_id: this.deviceId },
    }

    this.dispatchAction("light", command)
  }

  toggle(): void {
    this.dispatchChange(!this.getState())
  }
  off(): void {
    this.dispatchChange(false)
  }
  on(): void {
    this.dispatchChange(true)
  }
  getState(): boolean | null {
    return this.data?.entity?.state === "on"
  }
}
