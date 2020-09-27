import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { DeviceUpdate } from '../../devices/Device';
import axios from 'axios'

export const metNoConnect = (connectorId: string) => ({ type: `connector/${connectorId}/connect` });
export const metNoDisconnect = (connectorId: string) => ({ type: `connector/${connectorId}/disconnect` });

const debug = false;

const tick = async (store: MiddlewareAPI, connectorId: string) => {
    debug && console.log(`met.no: tick ${connectorId}`)
    const temperature = await fetchTemperature();
    const deviceData : DeviceUpdate = {
        deviceId: 'met-no-wroclaw-temperature',
        timestamp: new Date(),
        data: {
            temperature:  temperature,
        }
    }
    store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
};

const fetchTemperature = async () => {
    debug && console.log(`met.no: calling met.no REST API`)
    const data: any = await axios.get("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.11&lon=17.022222");
    return data.data.properties.timeseries[0].data.instant.details.air_temperature;
}

export const metNoMiddlewareFunction = (connectorId: string) => {
    const metNoMiddleware: Middleware = api => next => (action: PayloadAction<string>) => {
        switch (action.type) {
            case `connector/${connectorId}/connect`:
                console.log(`met.no: connect`)
                setTimeout( () => { tick(api, connectorId) }, 0);
                setInterval( () => { tick(api, connectorId) }, 5 * 60 * 1000);
                break;
            case `connector/${connectorId}/disconnect`:
                console.log(`met.no disconnect`)
                break;
        }
        return next(action);
    };
    return metNoMiddleware;
}
