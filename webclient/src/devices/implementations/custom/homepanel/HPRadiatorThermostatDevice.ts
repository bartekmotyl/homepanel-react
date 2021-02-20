import { toNumber } from "../../../../utils/conversionUtils"
import { ConnectedDeviceBase } from "../../../Device"
import { RadiatorThermostatInfo } from "../../../interfaces/generic/genericDevices"

export class HPRadiatorThermostatDevice extends ConnectedDeviceBase implements  RadiatorThermostatInfo  {
  getCurrentTemperature(): number | null {
    return toNumber(this.data?.currentTemperature)
  }
  getDesiredTemperature(): number | null {
    return toNumber(this.data?.desiredTemperature)
  }
  getValvePosition(): number | null {
    return toNumber(this.data?.valvePosition)
  }
}