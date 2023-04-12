import { Temperature } from "../../../interfaces/generic/genericDevices"
import { HABaseDevice } from "./HABaseDevice"

export class HATemperatureSensorDevice
  extends HABaseDevice
  implements Temperature
{
  getTemperature(): number | null {
    return parseFloat(this.data?.entity?.state)
  }
}
