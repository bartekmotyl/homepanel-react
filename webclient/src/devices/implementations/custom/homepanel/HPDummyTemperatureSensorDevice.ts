import { TemperatureSensorDevice } from "../../generic/TemperatureSensorDevice"

export class HPDummyTemperatureSensorDevice extends TemperatureSensorDevice {
  public isUpToDate(): boolean {
    return true
  }
}
