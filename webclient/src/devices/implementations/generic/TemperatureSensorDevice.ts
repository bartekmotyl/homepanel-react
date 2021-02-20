import { toNumber } from "../../../utils/conversionUtils"
import { ConnectedDeviceBase } from "../../Device";
import {Temperature, TextRepresentation} from "../../interfaces/generic/genericDevices";

export class TemperatureSensorDevice extends ConnectedDeviceBase implements Temperature, TextRepresentation {
  protected attributeName: string;

  constructor(deviceClass: string, connectorId: string, deviceId: string, name: string, attributeName: string) {
    super(deviceClass, connectorId, deviceId, name)

    this.attributeName = attributeName || "temperature"
  }

  getTemperature(): number | null {
    return toNumber(this.data===undefined ? null : this.data[this.attributeName])
  }

  getStateAsText(): string | null {
    if (this.getTemperature()) {
      return this.getTemperature()!.toFixed(2)
    } else {
      return "N/A"
    }
  }
}
