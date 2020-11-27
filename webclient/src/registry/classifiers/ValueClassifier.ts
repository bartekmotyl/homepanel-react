import { Device, DeviceBase, DeviceUpdate } from "../../devices/Device"

export abstract class ValueClassifier extends DeviceBase {
    constructor(deviceId: string) {
        super(deviceId, '')
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
    // https://mena.brightery.com/wp-content/uploads/2019/09/one-1.jpg
    
    Normal = "#b4c540",
    Information = "#f9ac67",
    Warning = "#fcaf58",
    Error = "#ee6a59",
    Critical = "#f95335",
    Disaster = "#674a40",

    VeryLowTemperature = "#577590",
    LowTemperature = "#43AA8B",
    StandardTemperature = "#90BE6D",
    HighTemperature = "#F8961E",
    VeryHighTemperature = "#F3722C",
 
    Undefined = "Gray",
}
