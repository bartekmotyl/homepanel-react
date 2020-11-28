export interface  DeviceConfiguration {
    deviceClass: string, 
    args: any[],
}


const defaultDevicesConfiguration: DeviceConfiguration[] = [
    {
        deviceClass: 'XiaomiTemperatureSensorDevice', 
        args: ['homepanel', 'ble-sensor-4c65a8df7d03', 'Living room',]
    }, {
        deviceClass: 'XiaomiTemperatureSensorDevice', 
        args: ['homepanel', 'ble-sensor-4c65a8df6a72', 'Jadalnia',]
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
        deviceClass: 'CompositeValueDevice', 
        args: ['homepanel', 'water-meter-main', 'Wodomierz główny',]
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
        deviceClass: 'HPRadiatorThermostatDevice', 
        args: ['homepanel', 'termostat-sypialnia', 'Termostat sypialnia']
    }, { 
        deviceClass: 'CompositeValueDevice', 
        args: ['homepanel', 'ble-sensor-00126fc21c3e', 'Na dworze']
    }, { 
        deviceClass: 'CompositeValueDevice', 
        args: ['homepanel', 'owire-sensor-co-zasilanie', 'CO zasilanie']
    }, { 
        deviceClass: 'CompositeValueDevice', 
        args: ['homepanel', 'pmsensor', 'Sensor PM']
    }, { 
        deviceClass: 'SimpleValueDevice', 
        args: ['homepanel', 'heating-status', 'Piec grzanie']
    }, { 
        deviceClass: 'TemperatureSensorDevice', 
        args: ['mock-1', 'mock-temperature-1', 'Mock 1',]
    }, {
        deviceClass: 'TemperatureSensorDevice', 
        args: ['met-no-1', 'met-no-wroclaw-temperature', 'Wrocław',]
    }
]


const defaultIndicatorWidgetSources: DeviceConfiguration[] = [
    {
        deviceClass: 'TemperatureIndicatorWidgetSource', 
        args: ['onewire-sensor-grunt-0-source-temperature', 'Grunt 0', 'onewire-sensor-grunt-0', 'composite-value-to-temperature']
    }, {
        deviceClass: 'TemperatureIndicatorWidgetSource', 
        args: ['ble-sensor-00126fc21c10-source-temperature', 'Serwerownia', 'ble-sensor-00126fc21c10', 'composite-value-to-temperature']
    }, {
        deviceClass: 'TemperatureIndicatorWidgetSource', 
        args: ['ble-sensor-4c65a8df6a72-source-temperature', 'Jadalnia', 'ble-sensor-4c65a8df6a72', null]
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
        deviceClass: 'WaterMeterIndicatorWidgetSource', 
        args: ['water-meter-main-source', 'Wodomierz główny', 'water-meter-main']
    }, {
        deviceClass: 'ThermostatIndicatorWidgetSource', 
        args: ['sypialnia-termostat-source', 'Sypialnia grzejnik (okno)', 'termostat-sypialnia', 'thermostat-to-temperature']
    }, {
        deviceClass: 'TemperatureIndicatorWidgetSource', 
        args: ['ble-sensor-00126fc21c3e-source-temperature', 'Na dworze', 'ble-sensor-00126fc21c3e', 'composite-value-to-temperature']
    }, {
        deviceClass: 'TemperatureIndicatorWidgetSource', 
        args: ['owire-sensor-co-zasilanie-as-temperature', 'CO zasilanie', 'owire-sensor-co-zasilanie', 'composite-value-to-temperature']
    }, {
        deviceClass: 'NumberIndicatorWidgetSource', 
        args: ['pmsensor-25-source-number', 'PM Sensor 2.5', 'pmsensor', 'pmsensor-25-as-number']
    }, {
        deviceClass: 'NumberIndicatorWidgetSource', 
        args: ['pmsensor-10-source-number', 'PM Sensor 10', 'pmsensor', 'pmsensor-10-as-number']
    }, {
        deviceClass: 'WarningIndicatorWidgetSource', 
        args: ['heating-status-source', 'Piec grzanie', 'heating-status', 'heating-status-as-boolean']
    }
]


const defaultValueClassifiers: DeviceConfiguration[] = [
    {
        deviceClass: 'IndoorTemperatureValueClassifier', 
        args: ['indoor-temperature-classifier',]
    }, {
        deviceClass: 'OutdoorTemperatureValueClassifier', 
        args: ['outdoor-temperature-classifier',]
    }, {
        deviceClass: 'HeatWaterTemperatureValueClassifier', 
        args: ['heatwater-temperature-classifier',]
    }, {
        deviceClass: 'PowerMeterValueClassifier', 
        args: ['power-meter-classifier-minute', 1.0]
    }, {
        deviceClass: 'AirQualityPM2_5ValueClassifier', 
        args: ['pmsensor-25-value-classifier',]
    }, {
        deviceClass: 'AirQualityPM10ValueClassifier', 
        args: ['pmsensor-10-value-classifier',]
    }

    
]


const defaultConverters: DeviceConfiguration[] = [
    {
        deviceClass: 'CompositeValueAsTemperatureConverter', 
        args: ['composite-value-to-temperature', '[noname]', 'temperature', ]
    }, {
        deviceClass: 'ThermostatAsTemperatureConverter', 
        args: ['thermostat-to-temperature', '[noname]']
    }, {
        deviceClass: 'CompositeValueAsNumberConverter', 
        args: ['pmsensor-25-as-number', '[noname]', 'pm2_5_std']
    }, {
        deviceClass: 'CompositeValueAsNumberConverter', 
        args: ['pmsensor-10-as-number', '[noname]', 'pm10_std']
    }, {
        deviceClass: 'SimpleValueAsBooleanConverter', 
        args: ['heating-status-as-boolean', '[noname]', 'grzac', true]
    }, 
]

let configDevices = [
    ...defaultDevicesConfiguration, 
    ...defaultIndicatorWidgetSources, 
    ...defaultValueClassifiers,
    ...defaultConverters,
]

export const getDevicesConfig = (): DeviceConfiguration[] => configDevices;