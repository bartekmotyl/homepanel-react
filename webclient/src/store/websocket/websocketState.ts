import Immutable from 'immutable';

export interface DeviceState {
  data: string | object;
}

export interface WebsocketState {
  connected: boolean;
  devices: Immutable.Map<string, DeviceState>;
}

const defaultWebsocketState: WebsocketState = {
  connected: false,
  devices: Immutable.Map<string, DeviceState>(),
};

export default defaultWebsocketState;
