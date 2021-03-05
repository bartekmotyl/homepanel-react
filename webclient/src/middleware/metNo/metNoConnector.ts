import { MiddlewareAPI } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { DeviceUpdate } from '../../devices/Device';
import { IConnector } from '../connectorsMiddleware';

import axios from 'axios'

const debug = true;

interface metNoEntry {
    lat: string,
    lon: string,
    deviceId: string,
}

export class MetNoConnector implements IConnector {
    private connectorId: string 
    private config: metNoEntry[] | undefined

    public constructor(connectorId: string) {
        this.connectorId = connectorId
    }    

    public getId(): string {
        return this.connectorId
    }

    public connect(store: MiddlewareAPI, config?: any) {
        this.config = config as metNoEntry[]
        debug && console.log(`metNoConnector: connect`)
        console.log(`met.no: connect`)
        setTimeout( () => { this.tick(store) }, 0)
        setInterval( () => { this.tick(store) }, 5 * 60 * 1000)
    }

    public disconnect() {
        debug && console.log(`metNoConnector: disconnect`)
    }
    
    public processAction(store: MiddlewareAPI, action: PayloadAction<any>): void {
    }    

    private async tick(store: MiddlewareAPI) {
        debug && console.log(`met.no: tick ${this.connectorId}`)
        for (const entry of this.config ?? []) {
            try {
                const temperature = await this.fetchTemperature(entry)
                debug && console.log(`met.no: Dispatching device update device: ${entry.deviceId}: ${temperature}`)
                const deviceData : DeviceUpdate = {
                    deviceId: entry.deviceId,
                    timestamp: new Date(),
                    data: {
                        temperature:  temperature,
                    },
                    upToDate: temperature !== undefined,
                }
                store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
            } catch (err) {
                debug && console.log(`met.no: Error when processing lat:${entry.lat} lon:${entry.lat} device:  ${entry.deviceId}: ${err}`)
            }
        }
    };
    
    private async fetchTemperature(entry: metNoEntry): Promise<number> {
        debug && console.log(`met.no: calling met.no REST API: lat:${entry.lat} lon:${entry.lat} device:  ${entry.deviceId}`)
        const data: any = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${entry.lat}&lon=${entry.lon}`)
        return data?.data?.properties?.timeseries[0]?.data?.instant?.details?.air_temperature as number
    }    

}
