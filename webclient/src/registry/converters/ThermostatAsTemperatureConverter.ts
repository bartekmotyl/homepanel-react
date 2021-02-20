import { Device, DeviceBase } from '../../devices/Device'
import { RadiatorThermostatInfo } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast'
import { AsTemperature } from './genericConverters'

export class ThermostatAsTemperatureConverter extends DeviceBase implements  AsTemperature {
    getTemperature(device: Device): number | null {
        return asInterface<RadiatorThermostatInfo>(this.deviceId, device).getCurrentTemperature()
    }
}