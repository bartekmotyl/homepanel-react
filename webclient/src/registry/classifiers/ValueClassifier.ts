import { Device, DeviceBase, DeviceUpdate } from "../../devices/Device"

export abstract class ValueClassifier extends DeviceBase {
    constructor(deviceId: string) {
        super('', deviceId, '')
    }
    public acceptData(update: DeviceUpdate): Device {
        return this
    }
    public classify(value : string) : ValueClass | string | null {
        return null
    }
}

export enum ValueClass {
    Normal = "#107c10",
    Warning = "#609121",
    Error = "#e0b300",
    Critical = "Crimson",
    VeryLowTemperature = "#0078d7",
    LowTemperature = "#29746d",
    StandardTemperature = "#107c10",
    HighTemperature = "#609121",
    VeryHighTemperature = "#e0b300",
    Undefined = "Gray",
}