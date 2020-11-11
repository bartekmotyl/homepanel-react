import { Device, DeviceBase, DeviceUpdate } from '../../devices/Device';
import { RadiatorThermostatInfo } from '../../devices/interfaces/generic/genericDevices';
import { AsTemperature } from '../genericConverters';

export class ThermostatAsTemperatureConverter extends DeviceBase implements  AsTemperature {
    acceptData(update: DeviceUpdate): Device {
        return this
    }
    getTemperature(device: Device): number | null {
        return (device as any as RadiatorThermostatInfo).getCurrentTemperature();
    }
}