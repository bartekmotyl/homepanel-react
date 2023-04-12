import { DoorSensor, Light } from "../../../interfaces/generic/genericDevices"
import { HABaseDevice } from "./HABaseDevice"

export class HABinarySensorDevice
  extends HABaseDevice
  implements DoorSensor, Light
{
  getState(): boolean | null {
    return this.data?.entity?.state === "on"
  }
  isClosed(): boolean | null {
    return this.data?.entity?.state === "off"
  }
}
