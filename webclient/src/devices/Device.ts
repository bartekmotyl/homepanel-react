import { clone } from "lodash";

export interface DeviceUpdate {
    deviceId: string, 
    data: any,
    timestamp: Date,
    upToDate: boolean,
}

export interface Device {
    getDeviceId(): string;
    getName(): string;
}

export interface ConnectedDevice extends Device {
    getConnectorId(): string;
    acceptData(update: DeviceUpdate): Device;   
    isUpToDate(): boolean; 
    getRawData(): any;
}


export abstract class DeviceBase implements Device {
    protected deviceId: string;
    protected name: string;
  
    constructor(deviceId: string, name: string) {
        this.deviceId = deviceId;
        this.name = name;
    }
    getDeviceId(): string {
        return this.deviceId;
    }
    getName(): string {
        return this.name;
    }
}


export abstract class ConnectedDeviceBase extends DeviceBase implements ConnectedDevice {
    protected connectorId: string;
    protected data: any; 
    protected upToDate: boolean;
  
    constructor(connectorId: string, deviceId: string, name: string) {
        super(deviceId, name)
        this.connectorId = connectorId;
        this.upToDate = false;
    }
    
    acceptData(update: DeviceUpdate): Device {
        this.upToDate = update.upToDate
        return this.acceptDataIntneral(update)
    }

    protected acceptDataIntneral(update: DeviceUpdate): Device {
        const cloned = clone(this)
        cloned.data = update.data
        return cloned
    }

    getConnectorId(): string {
        return this.connectorId;
    }

    getRawData(): any {
        return this.data;
    }

    public isUpToDate(): boolean {
        return this.upToDate
    }
}