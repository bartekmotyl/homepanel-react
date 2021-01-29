import { Device, DeviceBase, DeviceUpdate } from "../../devices/Device"

export abstract class ValueClassifier extends DeviceBase {
    constructor(deviceClass: string, deviceId: string) {
        super(deviceClass, deviceId, '')
    }
    public acceptData(update: DeviceUpdate): Device {
        return this
    }
    public classify(value : string) : ValueClass | string | null {
        return null
    }
}
/*
export enum ValueClass {
    Normal = "#90BE6D",
    Information = "#F9C74F",
    Warning = "#F8961E",
    Error = "#F3722C",
    Critical = "#F94144",
    Disaster = "black",

    VeryLowTemperature = "#577590",
    LowTemperature = "#43AA8B",
    StandardTemperature = "#90BE6D",
    HighTemperature = "#F8961E",
    VeryHighTemperature = "#F3722C",
 
    Undefined = "Gray",
}
*/

export enum ValueClass {
    // https://htmlcolorcodes.com/
    Normal = "#28b463",
    Information = "#d4ac0d",
    Warning = "#d68910",
    Error = "#ba4a00",
    Critical = "#cb4335",
    Disaster = "#a93226",

    VeryLowTemperature = "#2471a3",
    LowTemperature = "#138d75",
    StandardTemperature = "#28b463",
    HighTemperature = "#d68910",
    VeryHighTemperature = "#ba4a00",
 
    Undefined = "#707b7c",
}
