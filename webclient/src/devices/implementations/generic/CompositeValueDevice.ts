import { ConnectedDeviceBase } from "../../Device"
import { CompositeValue } from "../../interfaces/generic/genericDevices"

export class CompositeValueDevice extends ConnectedDeviceBase implements  CompositeValue {
  getValue(property: string): any {
    return  this.data && this.data[property]
  }
}

