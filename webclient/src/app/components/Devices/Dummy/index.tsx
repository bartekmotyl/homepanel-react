import React from 'react';
import { useSelector } from 'react-redux';
import { WebsocketState } from '../../../../store/websocket/websocketState';

interface RootState {
  websocket: WebsocketState;
}

interface Props {
  deviceId: string;
}

export function DummyDevice({ deviceId }: Props) {
  const selectStateDevice = (state: RootState) => {
    return state.websocket.devices.get(deviceId);
  };
  const device = useSelector(selectStateDevice);
  const data = device ? device.data : 'N/A';
  console.log(`Rendering Dummy of device: ${deviceId}`);
  return (
    <div>
      {deviceId}: {JSON.stringify(data)}
    </div>
  );
}
