import Immutable from 'immutable';
import defaultDevicesState, { DevicesState } from 'store/devicesState';
import { MockTemperatureSensor } from './devices';

export interface MockDevicesState extends DevicesState {}

const defaultMockDevicesState: MockDevicesState = {
  ...defaultDevicesState,
  devices: Immutable.fromJS({
    'dummy-temp1': new MockTemperatureSensor(),
  }),
};

export default defaultMockDevicesState;
