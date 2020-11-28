import { ConnectedDeviceBase } from "../../Device";
import { SimpleValue } from "../../interfaces/generic/genericDevices";

export class SimpleValueDevice extends ConnectedDeviceBase implements  SimpleValue {
  getValue(): any {
    return  this.data && this.data.currentValue;
  }
}

