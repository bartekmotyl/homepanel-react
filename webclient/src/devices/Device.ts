export interface DeviceUpdate {
    deviceId: string, 
    data: any,
    timestamp: Date,
}

export interface Device {
    getConnectorId(): string;
    getDeviceId(): string;
    getName(): string;
    acceptData(update: DeviceUpdate): Device;
}

export abstract class DeviceBase implements Device {
    protected connectorId: string;
    protected deviceId: string;
    protected name: string;
    protected data: any; 
  
    constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
        this.connectorId = connectorId;
        this.deviceId = deviceId;
        this.name = name;
        this.data = data;
    }
    
    abstract acceptData(update: DeviceUpdate): Device;

    getConnectorId(): string {
        return this.connectorId;
    }
    getDeviceId(): string {
        return this.deviceId;
    }
    getName(): string {
        return this.name;
    }
  }