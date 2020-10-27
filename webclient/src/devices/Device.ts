export interface DeviceUpdate {
    deviceId: string, 
    data: any,
    timestamp: Date,
}

export interface Device {
    getDeviceId(): string;
    getName(): string;
}

export interface ConnectedDevice extends Device {
    getConnectorId(): string;
    acceptData(update: DeviceUpdate): Device;    
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
  
    constructor(connectorId: string, deviceId: string, name: string, data = undefined) {
        super(deviceId, name)
        this.connectorId = connectorId;
        this.data = data;
    }
    
    abstract acceptData(update: DeviceUpdate): Device;

    getConnectorId(): string {
        return this.connectorId;
    }
}