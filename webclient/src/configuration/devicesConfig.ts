import { configDevices } from "../_custom/config"

export interface DeviceConfiguration {
  deviceClass: string
  args: any[]
}

export const getDevicesConfig = async (): Promise<DeviceConfiguration[]> => {
  return configDevices
}
