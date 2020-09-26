import { store } from '../app/store';
import { registerDevice } from '../devices/devicesSlice';
import { XiaomiTemperatureSensor } from '../devices/implementations/custom/homepanel/XiaomiTemperatureSensor';
import { SwitchDevice } from '../devices/implementations/generic/Switch';
import { TemperatureSensor } from '../devices/implementations/generic/TemperatureSensor';
import { hpHeadlessConnect } from '../middleware/hpHeadless/hpHeadlessMiddleware';
import { mockConnect } from '../middleware/mock/mockMiddleware';
import { hphWebSocketMiddlewareFunction } from '../middleware/hpHeadless/hpHeadlessMiddleware';
import { mockMiddlewareFunction } from '../middleware/mock/mockMiddleware';

export const connectorMiddlewares = [
    hphWebSocketMiddlewareFunction('homepanel'), 
    mockMiddlewareFunction('mock-1'),
];

export const configureDevices = () => {
    store.dispatch(registerDevice(new XiaomiTemperatureSensor('homepanel', 'ble-sensor-4c65a8df7d03', 'Living room')));
    store.dispatch(registerDevice(new SwitchDevice('homepanel', 'wiatrolap-lampa', 'Wiatrołap')));
    store.dispatch(registerDevice(new TemperatureSensor('mock-1', 'mock-temperature-1', 'Mock 1')));    
    store.dispatch(hpHeadlessConnect('homepanel', 'ws://192.168.1.111:8899'));    
    store.dispatch(mockConnect("mock-1"));    
}

