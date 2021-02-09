import { Device, DeviceBase } from '../../devices/Device';
import { RadiatorThermostatInfo } from '../../devices/interfaces/generic/genericDevices';
import { AsTemperature } from './genericConverters';

export class ThermostatAsTemperatureConverter extends DeviceBase implements  AsTemperature {
    getTemperature(device: Device): number | null {
        return (device as any as RadiatorThermostatInfo).getCurrentTemperature();
    }
}