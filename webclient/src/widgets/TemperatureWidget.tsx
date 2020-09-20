import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import { Temperature } from '../devices/interfaces/genericDevices';
import React from 'react';

interface Props {
    deviceId: string;
}

export function TemperatureWidget({ deviceId }: Props) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId) as Temperature | undefined;
    const data = device ? device.getTemperature() : 'N/A';
    return (
        <div>
            {deviceId}: {data}
        </div>
    );
}