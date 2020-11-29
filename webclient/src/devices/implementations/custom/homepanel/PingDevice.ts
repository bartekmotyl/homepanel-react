import { ConnectedDeviceBase } from "../../../Device";
import { AvailabilityChecker } from "../../../interfaces/generic/genericDevices";

export class PingDevice extends ConnectedDeviceBase implements  AvailabilityChecker {
  isAvailable(): boolean | null {
    return this.data?.state;
  }
}