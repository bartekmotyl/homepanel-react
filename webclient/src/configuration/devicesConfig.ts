import { fetchTextAsync } from '../utils/fetchUtils';
import { configFolderPath } from './startup';

export interface  DeviceConfiguration {
    deviceClass: string, 
    args: any[],
}

export const getDevicesConfig = async (): Promise<DeviceConfiguration[]> => {
    const url = `${configFolderPath}/devices.config.js`
    const configDevicesJs = await fetchTextAsync(url);
    // eslint-disable-next-line no-eval
    const configDevices = eval(configDevicesJs) as DeviceConfiguration[]     
    return configDevices
}