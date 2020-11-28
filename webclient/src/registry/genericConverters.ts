import { Device } from "../devices/Device";

export interface AsTemperature {
    getTemperature(device: Device): number | null;
}


export interface AsNumber {
    getNumber(device: Device): number | null;
}

export interface AsBoolean {
    getBoolean(device: Device): boolean | null;
}