import { MiddlewareAPI, AnyAction, Dispatch } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { IConnector } from '../connectorsMiddleware';
import { Device, DeviceUpdate } from '../../devices/Device';

const debug = true;


interface FHEMConfig {
    url: string,
    user: string,
    password: string,
}

/**
 * This is a dummy FHEM connecter, implemented mainly to set up a demo environment 
 * (demo FHEM instance running in docker-compose)
 */

export class FHEMConnector implements IConnector {
    private connectorId: string 
    private adapters: Map<string, DeviceAdapter> = new Map<string, DeviceAdapter>()
    private fhemConfig?: FHEMConfig 
    
    public constructor(connectorId: string) {
        this.connectorId = connectorId
        this.adapters.set('SwitchDevice', new SwitchDeviceAdapter())
        this.adapters.set('BlindsDevice', new BlindsDeviceAdapter())
        this.adapters.set('TemperatureSensorDevice', new TemperatureSensorDeviceAdapter())
        this.adapters.set('DoorSensorDevice', new DoorSensorDeviceAdapter())
        
    }

    public getId(): string {
        return this.connectorId
    }

    public connect(store: MiddlewareAPI, config?: any) {
        this.fhemConfig = config as FHEMConfig
        debug && console.log(`FHEMConnector: connecting to: ${this.fhemConfig.url}`)
        
        setTimeout(() => { this.retrieveCurrentReadings(store) }, 0)
    }

    public disconnect() {
        debug && console.log(`FHEM: disconnecting`)
    }

    public processAction(store: MiddlewareAPI, action: PayloadAction<any>): void {
        const parts = action.type.split('/')
        if (parts[0] === 'connector' && parts[1] === this.connectorId) {
            const deviceId = action.payload.deviceId;
            const devices = (store.getState() as RootState).devices
            const dev = devices.map.get(deviceId)!
            const clazz = dev.getClass() 
            const adapter = this.adapters.get(clazz)
            if (adapter) {        
                const fhemCall = (cmd: string) => {
                    const path = `/fhem?XHR=1&cmd=${encodeURI(cmd)}`
                    const url = `${this.fhemConfig!.url}${path}`
                    const token =  Buffer.from(`${this.fhemConfig!.user}:${this.fhemConfig!.password}`, 'utf8').toString('base64')
                    axios.get(url, {
                        headers: {
                          'Authorization': `Basic ${token}`
                        }
                    })                    
                }
                adapter.processAction(store, dev, fhemCall, parts.slice(2), action.payload)
            }
        } 
    }

    private async startLongPoll(store: MiddlewareAPI, connectorId: string, config: FHEMConfig) {
        debug && console.log(`FHEM: doLongPoll ${connectorId}`)
        const token =  Buffer.from(`${config.user}:${config.password}`, 'utf8').toString('base64')
    
        const longPollUrl = `${config.url}/fhem?XHR=1&inform=type=raw;filter=.*`
    
        let buffer = ''

        debug && console.log(`FHEM: doLongPoll ${longPollUrl}`)
    
        await axios.get(longPollUrl, {
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
                    //const _date = parts[0]
                    //const _time = parts[1]
                    //const _group = parts[2]
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
                    newEntries.forEach(entry => {
                        const dev = devices.map.get(entry!.device)!
                        const clazz = dev.getClass() 
                        const adapter = this.adapters.get(clazz)
                        if (adapter) {
                            const updateDataArr = adapter.accept(store, entry!.args)
                            if (updateDataArr) {
                                updateDataArr.forEach(data => {
                                    const deviceData: DeviceUpdate = {
                                        deviceId: entry!.device,
                                        data: data,
                                        timestamp: new Date(),
                                        upToDate: true,
                                    }
                                    debug && console.log(`dispatching status update:`,deviceData )
                                    store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
                                })
                            }
                        }
                    })
                }
            }
        });
    }

        
    private async retrieveCurrentReadings(store: MiddlewareAPI) {
        debug && console.log(`FHEM: doLongPoll ${this.connectorId}`)
        const token =  Buffer.from(`${this.fhemConfig!.user}:${this.fhemConfig!.password}`, 'utf8').toString('base64')
    
        const currentReadingsUrl = `${this.fhemConfig!.url}/fhem?XHR=1&cmd=jsonlist2`
    
        debug && console.log(`FHEM: retrieveCurrentReadings: ${currentReadingsUrl}`)
    
        const currentReadings = await axios.get(currentReadingsUrl, {
            headers: {
              'Authorization': `Basic ${token}`
            },   
        })      
        
        const devices = (store.getState() as RootState).devices

        currentReadings.data.Results.forEach((r: any) => {
            if (r?.Readings?.state) {
                const devName = r.Name
                const state = r?.Readings?.state

                if (devices.map.has(devName)) {
                    const dev = devices.map.get(devName)!
                    const clazz = dev.getClass() 
                    const adapter = this.adapters.get(clazz)
                    if (adapter) {
                        const updateDataArr = adapter.accept(store, [state.Value])
                        if (updateDataArr) {
                            updateDataArr.forEach(data => {
                                const deviceData: DeviceUpdate = {
                                    deviceId: devName,
                                    data: data,
                                    timestamp: new Date(),
                                    upToDate: true,
                                }
                                debug && console.log(`dispatching status update:`,deviceData )
                                store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
                            })
                        }
                    }
                }
            }
        })
        setTimeout(() => { this.startLongPoll(store, this.connectorId, this.fhemConfig!) }, 0)
    }

}


interface DeviceAdapter {
    accept(store: MiddlewareAPI, args: string[]): any[]
    processAction(store: MiddlewareAPI, device: Device, fhemCall: (cmd: string) => void, path: string[], payload: any): void
}

class SwitchDeviceAdapter implements DeviceAdapter {

    public accept(store: MiddlewareAPI<Dispatch<AnyAction>, any>, args: string[]): any[] {
        const constructStateUpdate = (state: boolean) => {
            return [ { state: state} ]
        }
        if (args[0] === 'on') {
            return constructStateUpdate(true)
        } else if (args[0] === 'off') {
            return constructStateUpdate(false)
        } else if (args[0] === 'state') {
			if (args[1] === 'off') {
                return constructStateUpdate(false)
			} else if (args[1] === 'on') {
                return constructStateUpdate(true)
			} 
		} 
		return []
    }
    public processAction(store: MiddlewareAPI, device: Device, fhemCall: (cmd: string) => void, 
            path: string[], payload: any): void {
            
        if (path[0] ==='device' && path[1] === 'switch' && path[2] === 'toggle') {
            const cmd = `set ${device.getDeviceId()} toggle`
            fhemCall(cmd)
        }
    }

}


class BlindsDeviceAdapter implements DeviceAdapter {

    public accept(store: MiddlewareAPI<Dispatch<AnyAction>, any>, args: string[]): any[] {
        return [] // nothing 
    }
    public processAction(store: MiddlewareAPI, device: Device, fhemCall: (cmd: string) => void, 
            path: string[], payload: any): void {
            
        if (path[0] ==='device' && path[1] === 'blinds') {
            const cmd = path[2]
            if (cmd === 'up') fhemCall(`set ${device.getDeviceId()} up`)
            if (cmd === 'down') fhemCall(`set ${device.getDeviceId()} down`)
            if (cmd === 'stop') fhemCall(`set ${device.getDeviceId()} stop`)
        }
    }    
}


class TemperatureSensorDeviceAdapter implements DeviceAdapter {

    public accept(store: MiddlewareAPI<Dispatch<AnyAction>, any>, args: string[]): any[] {
        return [ { temperature: Number(args[0]) } ]
    }
    public processAction(store: MiddlewareAPI, device: Device, fhemCall: (cmd: string) => void, 
            path: string[], payload: any): void {
    }    
}

class DoorSensorDeviceAdapter implements DeviceAdapter {

    public accept(store: MiddlewareAPI<Dispatch<AnyAction>, any>, args: string[]): any[] {
        return [ { state: args[0] } ]
    }
    public processAction(store: MiddlewareAPI, device: Device, fhemCall: (cmd: string) => void, 
            path: string[], payload: any): void {
    }    
}