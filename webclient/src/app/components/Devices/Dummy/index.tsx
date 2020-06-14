import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { RootState } from 'types';
import { DevicesState } from 'store/devicesState';

interface Props {
  deviceId: string;
  source: string;
}

export function DummyDevice({ deviceId, source }: Props) {
  const selectStateDevice = (state: RootState) => {
    const slice = state[source as keyof RootState] as DevicesState;
    let device = slice.devices.get(deviceId);
    return device;
  };
  const device = useSelector(selectStateDevice);
  const data = device ? device.dump() : 'N/A';
  console.log(`Rendering Dummy of device: ${deviceId}`);
  return (
    <div>
      <Button color="primary" variant="outlined">
        Hello World
      </Button>
      {deviceId}: {JSON.stringify(data)}
    </div>
  );
}
