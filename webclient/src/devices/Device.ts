export interface DeviceUpdate {
    deviceId: string, 
    data: any,
    timestamp: Date,
}

export interface Device {
    getDeviceId(): string;
    getName(): string;
    acceptData(update: DeviceUpdate): Device;
}

export abstract class DeviceBase implements Device {
    protected deviceId: string;
    protected name: string;
    protected data: any; 
  
    constructor(deviceId: string, name: string, data = undefined) {
      this.deviceId = deviceId;
      this.name = name;
      this.data = data;
    }
    
    abstract acceptData(update: DeviceUpdate): Device;

    getDeviceId(): string {
      return this.deviceId;
    }
    getName(): string {
      return this.name;
    }
  }