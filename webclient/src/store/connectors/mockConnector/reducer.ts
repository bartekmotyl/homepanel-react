import { GENERATE_MOCK_STATE } from './actions';
import defaultMockDevicesState, { MockDevicesState } from './state';
import { MockDevice } from './devices';

const mockConnectorReducer = (
  state = defaultMockDevicesState,
  action,
): MockDevicesState => {
  switch (action.type) {
    case GENERATE_MOCK_STATE: {
      let updatedDevices = state.devices;

      state.devices.keySeq().forEach(deviceId => {
        const dev: MockDevice = state.devices.get(deviceId) as MockDevice;
        updatedDevices = updatedDevices.set(deviceId, dev.generateNextState());
      });
      return {
        ...state,
        devices: updatedDevices,
      };
    }

    default: {
      return state;
    }
  }
};

export default mockConnectorReducer;
