import Immutable from 'immutable';
import { IDevice } from '../devices/Device';
import { TemperatureHumiditySensor } from 'devices/implementations/HomepanelXiaomiTemperatureSensor';

export interface DeviceState {
  data: object;
}

export interface DevicesState {
  devices: Immutable.Map<string, IDevice>;
}

const defaultDevicesState: DevicesState = {
  devices: Immutable.fromJS({
    'ble-sensor-4c65a8d94592': new TemperatureHumiditySensor(),
  }),
};

export default defaultDevicesState;
