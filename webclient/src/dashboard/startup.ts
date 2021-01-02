import { store } from '../app/store';

import { registerDevice } from '../devices/devicesSlice';
import { XiaomiTemperatureSensorDevice } from '../devices/implementations/custom/homepanel/XiaomiTemperatureSensorDevice';
import { INodeTemperatureSensorDevice } from '../devices/implementations/custom/homepanel/INodeTemperatureSensorDevice';
import { SwitchDevice } from '../devices/implementations/generic/SwitchDevice';
import { TemperatureSensorDevice } from '../devices/implementations/generic/TemperatureSensorDevice';
import { BlindsDevice } from '../devices/implementations/generic/BlindsDevice';
import { BlindsGroupDevice } from '../devices/implementations/generic/BlindsGroupDevice';
import { CompositeValueDevice } from '../devices/implementations/generic/CompositeValueDevice';
import { SimpleValueDevice } from '../devices/implementations/generic/SimpleValueDevice';
import { DoorSensorDevice } from '../devices/implementations/generic/DoorSensorDevice';
import { TimerDevice } from '../devices/implementations/generic/TimerDevice';
import { HPRadiatorThermostatDevice } from '../devices/implementations/custom/homepanel/HPRadiatorThermostatDevice';
import { PingDevice } from '../devices/implementations/custom/homepanel/PingDevice';
import { CompositeValueAsTemperatureConverter } from '../registry/converters/CompositeValueAsTemperatureConverter';
import { ThermostatAsTemperatureConverter } from '../registry/converters/ThermostatAsTemperatureConverter';
import { CompositeValueAsNumberConverter } from '../registry/converters/CompositeValueAsNumberConverter';

import { TemperatureIndicatorWidgetSource } from '../registry/indicators/TemperatureIndicatorWidgetSource';
import { IndoorTemperatureValueClassifier } from '../registry/classifiers/IndoorTemperatureValueClassifier';
import { PowerMeterIndicatorWidgetSource } from '../registry/indicators/PowerMeterIndicatorWidgetSource';
import { PowerMeterValueClassifier } from '../registry/classifiers/PowerMeterValueClassifier';

import { Device } from '../devices/Device';
import { getDevicesConfig } from './devicesConfig';
import { initializeConnectors } from './connectorsConfig';
import { DoorSensorIndicatorWidgetSource } from '../registry/indicators/DoorSensorIndicatorWidgetSource';
import { WaterMeterIndicatorWidgetSource } from '../registry/indicators/WaterMeterIndicatorWidgetSource';
import { ThermostatIndicatorWidgetSource } from '../registry/indicators/ThermostatIndicatorWidgetSource';
import { NumberIndicatorWidgetSource } from '../registry/indicators/NumberIndicatorWidgetSource';
import { OutdoorTemperatureValueClassifier } from '../registry/classifiers/OutdoorTemperatureValueClassifier';
import { HeatWaterTemperatureValueClassifier } from '../registry/classifiers/HeatWaterTemperatureValueClassifier';
import { AirQualityPM2_5ValueClassifier } from '../registry/classifiers/AirQualityPM2_5ValueClassifier';
import { AirQualityPM10ValueClassifier } from '../registry/classifiers/AirQualityPM10ValueClassifier';
import { SimpleValueAsBooleanConverter } from '../registry/converters/SimpleValueAsBooleanConverter';
import { WarningIndicatorWidgetSource } from '../registry/indicators/WarningIndicatorWidgetSource';
import { AvailabilityIndicatorWidgetSource } from '../registry/indicators/AvailabilityIndicatorWidgetSource';



const knownTypes: any = {
    XiaomiTemperatureSensorDevice, 
    INodeTemperatureSensorDevice,
    SwitchDevice,
    BlindsDevice,
    CompositeValueDevice,
    SimpleValueDevice,
    TemperatureSensorDevice,
    DoorSensorDevice,
    HPRadiatorThermostatDevice,
    PingDevice,
    BlindsGroupDevice,
    TimerDevice,
    CompositeValueAsTemperatureConverter,
    CompositeValueAsNumberConverter,
    ThermostatAsTemperatureConverter,
    SimpleValueAsBooleanConverter,
    TemperatureIndicatorWidgetSource,
    PowerMeterIndicatorWidgetSource,
    DoorSensorIndicatorWidgetSource,
    WaterMeterIndicatorWidgetSource,
    ThermostatIndicatorWidgetSource,
    NumberIndicatorWidgetSource,
    WarningIndicatorWidgetSource,
    AvailabilityIndicatorWidgetSource,
    IndoorTemperatureValueClassifier,
    OutdoorTemperatureValueClassifier,
    PowerMeterValueClassifier,
    HeatWaterTemperatureValueClassifier,
    AirQualityPM2_5ValueClassifier,
    AirQualityPM10ValueClassifier
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

