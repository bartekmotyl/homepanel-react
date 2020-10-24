import { Device } from "../devices/Device";

export interface AsTemperature {
    getTemperature(device: Device): number | null;
}