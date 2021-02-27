import { ConnectedDeviceBase } from "../../Device";
import {Temperature, TextRepresentation} from "../../interfaces/generic/genericDevices";

export class GenericSensorDevice extends ConnectedDeviceBase implements TextRepresentation {
  protected attributeName: string;

  constructor(deviceClass: string, connectorId: string, deviceId: string, name: string, attributeName: string) {
    super(deviceClass, connectorId, deviceId, name)

    this.attributeName = attributeName || "currentValue"
  }

  getStateAsText(): string | null {
    return this.data===undefined ? null : this.data[this.attributeName]
  }
}