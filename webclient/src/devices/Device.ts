import { clone } from "lodash"

export interface DeviceUpdate {
    deviceId: string, 
    data: any,
    timestamp: Date,
    upToDate: boolean,
}

export interface Device {
    getDeviceId(): string
    getName(): string
    getClass(): string
}

export interface ConnectedDevice extends Device {
    getConnectorId(): string
    acceptData(update: DeviceUpdate): Device
    isUpToDate(): boolean
    getRawData(): any
}


export abstract class DeviceBase implements Device {
    protected deviceId: string
    protected name: string
    protected deviceClass: string
  
    constructor(deviceClass: string, deviceId: string, name: string) {
        this.deviceId = deviceId
        this.name = name
        this.deviceClass = deviceClass

        console.log(`Constructing ${deviceClass}, id: ${deviceId}, name: ${name}` )
    }
    getDeviceId(): string {
        return this.deviceId
    }
    getName(): string {
        return this.name
    }
    getClass(): string {
        return this.deviceClass
    }
}


export abstract class ConnectedDeviceBase extends DeviceBase implements ConnectedDevice {
    protected connectorId: string
    protected data: any
    protected upToDate: boolean
  
    constructor(deviceClass: string, connectorId: string, deviceId: string, name: string) {
        super(deviceClass, deviceId, name)
        this.connectorId = connectorId
        this.upToDate = false
    }
    
    acceptData(update: DeviceUpdate): Device {
        this.upToDate = update.upToDate
        return this.acceptDataInternal(update)
    }

    protected acceptDataInternal(update: DeviceUpdate): Device {
        const cloned = clone(this)
        cloned.data = update.data
        return cloned
    }

    getConnectorId(): string {
        return this.connectorId
    }

    getRawData(): any {
        return this.data
    }

    public isUpToDate(): boolean {
        return this.upToDate
    }
}