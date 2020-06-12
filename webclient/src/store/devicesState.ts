import Immutable from 'immutable';
import { Device } from '../devices/Device';
import { TemperatureHumiditySensor } from 'devices/implementations/HomepanelXiaomiTemperatureSensor';

export interface DeviceState {
  data: object;
}

export interface DevicesState {
  devices: Immutable.Map<string, Device>;
}

const defaultDevicesState: DevicesState = {
  devices: Immutable.fromJS({
    'ble-sensor-4c65a8d94592': new TemperatureHumiditySensor(),
  }),
};

export default defaultDevicesState;
