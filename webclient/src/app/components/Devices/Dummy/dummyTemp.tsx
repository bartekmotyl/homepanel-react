import React from 'react';
import { useSelector } from 'react-redux';
import { Temperature } from 'devices/interfaces/device-interfaces';

interface Props {
  deviceId: string;
  source: string;
}

export function DummyTempDevice({ deviceId, source }: Props) {
  const selectStateDevice = (state: Temperature) => {
    return state[source].devices.get(deviceId);
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
