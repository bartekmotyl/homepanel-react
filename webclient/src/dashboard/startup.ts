import { store } from '../app/store';

import { registerDevice } from '../devices/devicesSlice';
import { XiaomiTemperatureSensor } from '../devices/implementations/custom/homepanel/XiaomiTemperatureSensor';
import { SwitchDevice } from '../devices/implementations/generic/SwitchDevice';
import { TemperatureSensorDevice } from '../devices/implementations/generic/TemperatureSensor';
import { BlindsDevice } from '../devices/implementations/generic/Blinds';
import { CompositeValueDevice } from '../devices/implementations/generic/CompositeValueDevice';
import { SimpleValueDevice } from '../devices/implementations/generic/SimpleValueDevice';
import { DoorSensorDevice } from '../devices/implementations/generic/DoorSensorDevice';
import { CompositeValueAsTemperatureConverter } from '../registry/converters/CompositeValueAsTemperatureConverter';
import { TemperatureIndicatorWidgetSource } from '../registry/indicators/TemperatureIndicatorWidgetSource';
import { IndoorTemperatureValueClassifier } from '../registry/classifiers/IndoorTemperatureValueClassifier';
import { PowerMeterIndicatorWidgetSource } from '../registry/indicators/PowerMeterIndicatorWidgetSource';
import { PowerMeterValueClassifier } from '../registry/classifiers/PowerMeterValueClassifier';

import { Device } from '../devices/Device';
import { getDevicesConfig } from './devicesConfig';
import { initializeConnectors } from './connectorsConfig';
import { DoorSensorIndicatorWidgetSource } from '../registry/indicators/DoorSensorIndicatorWidgetSource';




const knownTypes: any = {
    XiaomiTemperatureSensor, 
    SwitchDevice,
    BlindsDevice,
    CompositeValueDevice,
    SimpleValueDevice,
    TemperatureSensorDevice,
    DoorSensorDevice,
    CompositeValueAsTemperatureConverter,
    TemperatureIndicatorWidgetSource,
    PowerMeterIndicatorWidgetSource,
    DoorSensorIndicatorWidgetSource,
    IndoorTemperatureValueClassifier,
    PowerMeterValueClassifier,
}



const createDeviceDynamically = (deviceClass: string, args: any) => {
    if (knownTypes[deviceClass] === undefined || knownTypes[deviceClass] === null) {
        throw new Error(`Class type of '${deviceClass}' is not known.`);
    }
    return new knownTypes[deviceClass](...args);    
}

export const configureDevices = () => {

    const configDevices = getDevicesConfig()
    const dynamicDevices = configDevices.map(devCfg => createDeviceDynamically(devCfg.deviceClass, devCfg.args) as Device)

    dynamicDevices.forEach(dev => {
        store.dispatch(registerDevice(dev));
    })
    initializeConnectors()
}

