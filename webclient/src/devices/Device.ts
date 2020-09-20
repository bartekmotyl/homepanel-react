export interface DeviceUpdate {
    deviceId: string, 
    data: any,
    timestamp: Date,
}

export interface Device {
    getDeviceId(): string;
    acceptData(update: DeviceUpdate): Device;
}