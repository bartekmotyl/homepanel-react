import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import { Temperature } from '../devices/interfaces/generic/genericDevices';

interface Props {
    deviceId: string;
}

export function TemperatureWidget({ deviceId }: Props) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const temperature = device as Temperature | undefined;
    const data = temperature?.getTemperature() ?? 'N/A';
    return (
        <div>
            {device?.getName()}: {data}
        </div>
    );
}