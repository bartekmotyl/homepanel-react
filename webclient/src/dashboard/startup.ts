import { store } from '../app/store';
import { get as getLS, set as setLS }  from 'local-storage';
import { registerDevice } from '../devices/devicesSlice';
import { XiaomiTemperatureSensor } from '../devices/implementations/custom/homepanel/XiaomiTemperatureSensor';
import { SwitchDevice } from '../devices/implementations/generic/Switch';
import { TemperatureSensorDevice } from '../devices/implementations/generic/TemperatureSensor';
import { hpHeadlessConnect } from '../middleware/hpHeadless/hpHeadlessMiddleware';
import { mockConnect } from '../middleware/mock/mockMiddleware';
import { hphWebSocketMiddlewareFunction } from '../middleware/hpHeadless/hpHeadlessMiddleware';
import { mockMiddlewareFunction } from '../middleware/mock/mockMiddleware';
import { metNoConnect, metNoMiddlewareFunction } from '../middleware/metNo/metNoMiddleware';
import { BlindsDevice } from '../devices/implementations/generic/Blinds';
import { CompositeValueDevice } from '../devices/implementations/generic/CompositeValueDevice';
import { SimpleValueDevice } from '../devices/implementations/generic/SimpleValueDevice';
import { CompositeValueAsTemperatureConverter } from '../registry/converters/CompositeValueAsTemperatureConverter';
import { TemperatureIndicatorWidgetSource } from '../registry/indicators/TemperatureIndicatorWidgetSource';
import { IndoorTemperatureValueClassifier } from '../registry/classifiers/IndoorTemperatureValueClassifier';
import { PowerMeterIndicatorWidgetSource } from '../registry/indicators/PowerMeterIndicatorWidgetSource';
import { PowerMeterValueClassifier } from '../registry/classifiers/PowerMeterValueClassifier';
import { Device } from '../devices/Device';
import { defaultDevicesConfiguration, DeviceConfiguration } from './config';

export const connectorMiddlewares = [
    hphWebSocketMiddlewareFunction('homepanel'), 
    mockMiddlewareFunction('mock-1'),
    metNoMiddlewareFunction('met-no-1'),
];


const knownTypes: any = {
    XiaomiTemperatureSensor, 
    SwitchDevice,
    BlindsDevice,
    CompositeValueDevice,
    SimpleValueDevice,
    TemperatureSensorDevice,
    CompositeValueAsTemperatureConverter,
    TemperatureIndicatorWidgetSource,
    PowerMeterIndicatorWidgetSource,
    IndoorTemperatureValueClassifier,
    PowerMeterValueClassifier,
}




let config = getLS('devices') as DeviceConfiguration[]
if (!config) {
    config = defaultDevicesConfiguration;
    setLS('devices', config);
}

const createDeviceDynamically = (deviceClass: string, args: any) => {
    if (knownTypes[deviceClass] === undefined || knownTypes[deviceClass] === null) {
        throw new Error(`Class type of '${deviceClass}' is not known.`);
    }
    return new knownTypes[deviceClass](...args);    
}

export const configureDevices = () => {

    const dynamicDevices = config.map(devCfg => createDeviceDynamically(devCfg.deviceClass, devCfg.args) as Device)

    dynamicDevices.forEach(dev => {
        store.dispatch(registerDevice(dev));
    })

    store.dispatch(hpHeadlessConnect('homepanel', 'ws://192.168.1.111:8899'));    
    store.dispatch(mockConnect('mock-1'));    
    store.dispatch(metNoConnect('met-no-1'));    
}
