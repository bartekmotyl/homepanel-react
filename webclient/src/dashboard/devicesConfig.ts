import { get as getLS, set as setLS }  from 'local-storage';

export interface  DeviceConfiguration {
    deviceClass: string, 
    args: any[],
}


const defaultDevicesConfiguration: DeviceConfiguration[] = [{
    deviceClass: 'XiaomiTemperatureSensor', 
    args: ['homepanel', 'ble-sensor-4c65a8df7d03', 'Living room',]
}, {
    deviceClass: 'SwitchDevice', 
    args: ['homepanel', 'wiatrolap-lampa', 'Wiatrołap',]
}, {
    deviceClass: 'BlindsDevice', 
    args: ['homepanel', 'roleta-salon-lewa', 'Roleta - Salon L',]
}, {
    deviceClass: 'CompositeValueDevice', 
    args: ['homepanel', 'onewire-sensor-grunt-0', 'Grunt 0cm',]
}, {
    deviceClass: 'CompositeValueDevice', 
    args: ['homepanel', 'ble-sensor-00126fc21c10', 'Serwerownia',]
}, {
    deviceClass: 'CompositeValueDevice', 
    args: ['homepanel', 'ble-sensor-00126f6d3a29', 'Prąd',]
}, {
    deviceClass: 'SimpleValueDevice', 
    args: ['homepanel', 'water-meter-main-value', 'Wodomierz',]
}, {
    deviceClass: 'DoorSensorDevice', 
    args: ['homepanel', 'kontaktron-lazienka-pietro-okno', 'Łazienka piętro okno',]
}, {
    deviceClass: 'DoorSensorDevice', 
    args: ['homepanel', 'kontaktron-gabinet-okno', 'Gabinet okno',]
}, {
    deviceClass: 'DoorSensorDevice', 
    args: ['homepanel', 'kontaktron-lazienka-pietro-okno', 'Łazieka piętro okno',]
}, { 
    deviceClass: 'TemperatureSensorDevice', 
    args: ['mock-1', 'mock-temperature-1', 'Mock 1',]
}, {
    deviceClass: 'TemperatureSensorDevice', 
    args: ['met-no-1', 'met-no-wroclaw-temperature', 'Wrocław',]
}, {
    deviceClass: 'CompositeValueAsTemperatureConverter', 
    args: ['composite-value-to-temperature', 'temperature', ]
}, {
    deviceClass: 'TemperatureIndicatorWidgetSource', 
    args: ['onewire-sensor-grunt-0-source-temperature', 'Grunt 0', 'onewire-sensor-grunt-0', 'composite-value-to-temperature']
}, {
    deviceClass: 'TemperatureIndicatorWidgetSource', 
    args: ['ble-sensor-00126fc21c10-source-temperature', 'Serwerownia', 'ble-sensor-00126fc21c10', 'composite-value-to-temperature']
}, {
    deviceClass: 'PowerMeterIndicatorWidgetSource', 
    args: ['power-meter-source', 'Prąd', 'ble-sensor-00126f6d3a29',]
}, {
    deviceClass: 'DoorSensorIndicatorWidgetSource', 
    args: ['gabinet-window-source', 'Gabinet', 'kontaktron-gabinet-okno']
}, {
    deviceClass: 'DoorSensorIndicatorWidgetSource', 
    args: ['lazienka-pietro-window-source', 'Łazienka piętro okno', 'kontaktron-lazienka-pietro-okno']
}, {
    deviceClass: 'IndoorTemperatureValueClassifier', 
    args: ['indoor-temperature-classifier',]
}, {
    deviceClass: 'PowerMeterValueClassifier', 
    args: ['power-meter-classifier-minute', 60.0]
}]

let configDevices = defaultDevicesConfiguration;

export const getDevicesConfig = (): DeviceConfiguration[] => configDevices;