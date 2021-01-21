import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// @ts-ignore
import Request from 'axios-request-handler';
import { RootState } from '../../app/store';

// Actions to be dispatched to the middleware 
export const fhemConnect = (connectorId: string, url: string, user: string, password: string) => ({ 
    type: `connector/${connectorId}/connect`, payload: {
        url, 
        user, 
        password
    }});

export const fhemDisconnect = (connectorId: string) => ({ 
    type: `connector/${connectorId}/disconnect` });


const debug = true;


const startLongPoll = async (store: MiddlewareAPI, connectorId: string, config: FHEMConfig) => {
    debug && console.log(`FHEM: doLongPoll ${connectorId}`)
    const token = Buffer.from(`${config.user}:${config.password}`, 'utf8').toString('base64')

    const longPollUrl = `${config.url}/fhem?XHR=1&inform=type=raw;filter=.*`

    let buffer = ''

    const data: any = await axios.get(longPollUrl, {
        headers: {
          'Authorization': `Basic ${token}`
        }, 
        onDownloadProgress: (ev: ProgressEvent) => {
            const response: string = (ev.target as any).response as string
            const newData = response.substring(buffer.length)
            buffer = response
            const newLines = newData.split(/\r?\n/)
            const devices = (store.getState() as RootState).devices

            const newEntries = newLines.map(l => {
                const parts = l.replace('<br>', '').split(' ')
                const date = parts[0]
                const time = parts[1]
                const group = parts[2]
                const device = parts[3]
                const args = parts.slice(4)
                if (!device || !devices.map.has(device)) {
                    return undefined                    
                }
                return {
                    device, 
                    args,
                }
            }).filter(e=>e !== undefined)

            if (newEntries.length > 0) {
                debug && console.log('FHEM: long poll data: ', newEntries);
            }
        }
    });

    //debug && console.log(`FHEM: long polling request finished.`)
    //setTimeout( () => { doLongPoll(store, connectorId, config) }, 5000);
}

interface FHEMConfig {
    url: string,
    user: string,
    password: string,
}

export const fhemMiddlewareFunction = (connectorId: string) => {
    const fhemMiddleware: Middleware = (api: MiddlewareAPI) => next => (action: PayloadAction<FHEMConfig>) => {
        
        switch (action.type) {
            case `connector/${connectorId}/connect`:
                debug && console.log(`FHEM: connecting to: ${action.payload.url}`)
                setTimeout( () => { startLongPoll(api, connectorId, action.payload) }, 0);
                break;
            case `connector/${connectorId}/disconnect`:
                debug && console.log(`FHEM: disconnecting`)
                break;
            /*
            case `connector/${connectorId}/device/switch/toggle`:
                sendAction(action.payload.deviceId, 'toggle');
                break;
            case `connector/${connectorId}/device/blinds/up`:
                sendAction(action.payload.deviceId, 'moveUp');
                break;
            case `connector/${connectorId}/device/blinds/down`:
                sendAction(action.payload.deviceId, 'moveDown');
                break;
            case `connector/${connectorId}/device/blinds/stop`:
                sendAction(action.payload.deviceId, 'stopMove');
                break;
            */
        }
        return next(action);
    };
    return fhemMiddleware;
};
