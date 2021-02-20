import { ConnectedDeviceBase } from "../../Device"
import { DoorSensor  } from "../../interfaces/generic/genericDevices"

export class DoorSensorDevice extends ConnectedDeviceBase implements  DoorSensor {
  isClosed(): boolean | null {
    return this.data?.state === "closed"
  }
}