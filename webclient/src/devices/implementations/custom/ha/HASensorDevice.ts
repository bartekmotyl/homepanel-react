import { SimpleValue } from "../../../interfaces/generic/genericDevices"
import { HABaseDevice } from "./HABaseDevice"

export class HASensorDevice extends HABaseDevice implements SimpleValue {
  getValue() {
    return this.data?.entity?.state
  }
}
