import { MiddlewareAPI } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { DeviceUpdate } from '../../devices/Device';
import { IConnector } from '../connectorsMiddleware';

const debug = false;

export class HPWebSocketConnector implements IConnector {
    private connectorId: string 
    private socket: WebSocket | null = null;

    public constructor(connectorId: string) {
        this.connectorId = connectorId
    }

    public getId(): string {
        return this.connectorId
    }

    public connect(store: MiddlewareAPI, config?: any) {
        if (this.socket !== null) {
            this.socket.close();
        }
        console.log(`Home panel websocket: connecting to: ${config}`)

        // connect to the remote host
        this.socket = new WebSocket(config);

        // websocket handlers
        this.socket.onmessage = this.onMessage(store);
        this.socket.onclose = this.onClose(store);
        this.socket.onopen = this.onOpen(store);
    }
    public disconnect() {
        if (this.socket !== null) {
            this.socket.close();
        }
        this.socket = null;
    }

    public processAction(store: MiddlewareAPI, action: PayloadAction<any>): void {

        switch (action.type) {
            case `connector/${this.connectorId}/device/switch/toggle`:
                this.sendAction(action.payload.deviceId, 'toggle');
                break;
            case `connector/${this.connectorId}/device/blinds/up`:
                this.sendAction(action.payload.deviceId, 'moveUp');
                break;
            case `connector/${this.connectorId}/device/blinds/down`:
                this.sendAction(action.payload.deviceId, 'moveDown');
                break;
            case `connector/${this.connectorId}/device/blinds/stop`:
                this.sendAction(action.payload.deviceId, 'stopMove');
                break;
        }
    
    }
    
    private sendAction = (deviceId: string, action: string) => {
        console.log(`sending action: ${action} to ${deviceId}`)
        const msg = JSON.stringify({
            messageType: 'action',
            deviceId: deviceId,
            action: action,
        });
        this.socket?.send(msg);
    }

    private onOpen (store: MiddlewareAPI) {
        return (ev: Event) => {
            console.log(`Home panel websocket: connected`)
            this.socket?.send(JSON.stringify({ messageType: "requestStateAll" }))
        }
    };
    
    private onClose(store: MiddlewareAPI) { 
        return () => {
        }
    };
    
    private onMessage(store: MiddlewareAPI) {

        return  (event: MessageEvent) => {
            debug && console.log(`Home panel websocket message received: ${event.data}`)
            var payload = JSON.parse(event.data);
            if (payload.messageType === "deviceState") {
                const deviceData: DeviceUpdate = {
                    deviceId: payload.device,
                    data: payload.data,
                    timestamp: payload.timestamp,
                    upToDate: payload.activeAttributes.length > 0,
                }
                store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
            }
        }
    };    
};
