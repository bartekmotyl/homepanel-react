import React from 'react';
import { useSelector } from 'react-redux';
import { Temperature } from 'devices/interfaces/device-interfaces';
import { RootState } from 'types';
import { DevicesState } from 'store/devicesState';

interface Props {
  deviceId: string;
  source: string;
}

export function DummyTempDevice({ deviceId, source }: Props) {
  const selectStateDevice = (state: RootState): Temperature => {
    const slice = state[source as keyof RootState] as DevicesState;
    let device = slice.devices.get(deviceId);
    return (device as unknown) as Temperature;
  };
  const device = useSelector(selectStateDevice);
  const data = device ? device.T : 'N/A';
  console.log(`Rendering Dummy of device: ${deviceId}`);
  return (
    <div>
      {deviceId}: {data}
    </div>
  );
}
