import { ConnectedDeviceBase } from "../../../Device";
import { RadiatorThermostatInfo } from "../../../interfaces/generic/genericDevices";

export class HPRadiatorThermostatDevice extends ConnectedDeviceBase implements  RadiatorThermostatInfo  {
  getCurrentTemperature(): number | null {
    return Number(this.data?.currentTemperature);
  }
  getDesiredTemperature(): number | null {
    return Number(this.data?.desiredTemperature);
  }
  getValvePosition(): number | null {
    return Number(this.data?.valvePosition);
  }
}