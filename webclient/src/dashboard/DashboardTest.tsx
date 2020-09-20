import React from 'react';
import { TemperatureWidget } from '../widgets/TemperatureWidget';

export function DashboardTest() {
    return (
        <>
            <div>
                <TemperatureWidget deviceId="homepanel/ble-sensor-4c65a8df7d03"  />
            </div>
        </>
    );
}