import { DoorSensor } from "../../../interfaces/generic/genericDevices"
import { HABaseDevice } from "./HABaseDevice"

export class HACoverDevice extends HABaseDevice implements DoorSensor {
  isClosed(): boolean | null {
    return this.data?.entity?.state === "closed"
  }
}
