import defaultDevicesState, { DevicesState } from 'store/devicesState';

export interface HomepanelWebsocketDevicesState extends DevicesState {
  connected: boolean;
}

const defaultHomepanelWebsocketDevicesState: HomepanelWebsocketDevicesState = {
  ...defaultDevicesState,
  connected: false,
};

export default defaultHomepanelWebsocketDevicesState;
