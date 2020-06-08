import Immutable from 'immutable';

export interface DeviceState {
  data: object;
}

export interface DevicesState {
  devices: Immutable.Map<string, DeviceState>;
}

const defaultDevicesState: DevicesState = {
  devices: Immutable.Map<string, DeviceState>(),
};

export default defaultDevicesState;
