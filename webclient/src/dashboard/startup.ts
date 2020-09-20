import { store } from '../app/store';
import { registerDevice } from '../devices/devicesSlice';
import { XiaomiTemperatureSensor } from '../devices/implementations/custom/homepanel/XiaomiTemperatureSensor';
import { hphWsConnect } from '../middleware/hpHeadless/hphWebsocket';

export const configureDevices = () => {
    store.dispatch(registerDevice(new XiaomiTemperatureSensor('homepanel/ble-sensor-4c65a8df7d03', 'Living room')));    
    store.dispatch(hphWsConnect("ws://192.168.1.111:8899"));    
}