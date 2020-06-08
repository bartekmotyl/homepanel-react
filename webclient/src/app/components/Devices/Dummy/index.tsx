import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

interface Props {
  deviceId: string;
  source: string;
}

export function DummyDevice({ deviceId, source }: Props) {
  const selectStateDevice = (state: any) => {
    return state[source].devices.get(deviceId);
  };
  const device = useSelector(selectStateDevice);
  const data = device ? device.data : 'N/A';
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
