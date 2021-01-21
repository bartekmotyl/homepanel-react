(function() {
    const createDevice = (clazz, args) => {
        return {
            deviceClass: clazz, 
            args: args,
        }
    }
    
    const createDeviceBlinds = (args) => {
        return createDevice('BlindsDevice', args)
    }
    
    const createDeviceTimer = (connectorId, deviceId, name, duration) => {
        return createDevice('TimerDevice', [connectorId, deviceId, name, duration])
    }

    const defaultDevicesConfiguration = [
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-4c65a8df7d03', 'Salon']),
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-4c65a8df6a72', 'Jadalnia']),
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-582d34364ee7', 'Garaż']),
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-582d34364f04', 'Drukarka 3D']),
        createDevice('INodeTemperatureSensorDevice', ['homepanel', 'ble-sensor-00126fc21ca1', 'Wiatrołap']),
        createDevice('INodeTemperatureSensorDevice', ['homepanel', 'ble-sensor-00126fc21bb7', 'Łazienka parter']),
        createDevice('INodeTemperatureSensorDevice', ['homepanel', 'ble-sensor-00126fc21b0a', 'Kotłownia']),
        createDevice('INodeTemperatureSensorDevice', ['homepanel', 'ble-sensor-00126fc21c3e', 'Na dworze']),
        createDevice('INodeTemperatureSensorDevice', ['homepanel', 'ble-sensor-00126fc21c10', 'Serwerownia']),
    
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-4c65a8d95832', 'Sypialnia']),
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-4c65a8d94592', 'Mały pokój (Daniel)']),
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-4c65a8d07cad', 'Duży pokój (Nina)']),
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-4c65a8d9497b', 'Gabinet']),
        createDevice('XiaomiTemperatureSensorDevice', ['homepanel', 'ble-sensor-4c65a8d0349f', 'Łazienka pętro']),
        createDevice('INodeTemperatureSensorDevice', ['homepanel', 'ble-sensor-00126fd655c4', 'Garderoba']),
    
        createDevice('SwitchDevice', ['homepanel', 'wiatrolap-lampa', 'Wiatrołap']),
        createDevice('SwitchDevice', ['homepanel', 'hall-parter-lampa', 'Hall']),
        createDevice('SwitchDevice', ['homepanel', 'schody-lampa', 'Schody']),
        createDevice('SwitchDevice', ['homepanel', 'kuchnia-lampa', 'Kuchnia']),
        createDevice('SwitchDevice', ['homepanel', 'jadalnia-lampa', 'Jadalnia']),
        createDevice('SwitchDevice', ['homepanel', 'salon-led', 'Salon LED']),
        createDevice('SwitchDevice', ['homepanel', 'salon-tv', 'Salon TV']),
        createDevice('SwitchDevice', ['homepanel', 'salon-kominek', 'Salon kominek']),
        createDevice('SwitchDevice', ['homepanel', 'salon-kinkiety', 'Salon kinkiety']),
        createDevice('SwitchDevice', ['homepanel', 'salon-halogeny-okno', 'Salon halogeny okno']),
        createDevice('SwitchDevice', ['homepanel', 'salon-halogeny-tyl', 'Salon halogeny tył']),
        createDevice('SwitchDevice', ['homepanel', 'garaz-lampa', 'Garaż']),
        createDevice('SwitchDevice', ['homepanel', 'kuchnia-kinkiet', 'Kuchnia kinkiet']),
        createDevice('SwitchDevice', ['homepanel', 'hall-parter-kinkiet', 'Hall parter kinkiet']),
        createDevice('SwitchDevice', ['homepanel', 'lazienka-parter-sufit', 'Łazienka parter sufit']),
        createDevice('SwitchDevice', ['homepanel', 'lazienka-parter-lustro', 'Łazienka parter lustro']),
        
        createDevice('SwitchDevice', ['homepanel', 'sypialnia-kinkiet-lewy', 'Sypialnia kinkiet lewy']),
        createDevice('SwitchDevice', ['homepanel', 'sypialnia-kinkiet-prawy', 'Sypialnia kinkiet prawy']),
        createDevice('SwitchDevice', ['homepanel', 'gabinet-lampa-lewa', 'Gabinet lampa lewa']),
        createDevice('SwitchDevice', ['homepanel', 'gabinet-lampa-prawa', 'Gabinet lampa prawa']),
        
        createDeviceTimer('timers', 'timer-1-minute', '1 minuta', 'PT1M'),
        createDeviceTimer('timers', 'timer-2-minute', '2 minuty', 'PT2M'),
        createDeviceTimer('timers', 'timer-3-minute', '3 minuty', 'PT3M'),
        createDeviceTimer('timers', 'timer-4-minute', '4 minuty', 'PT4M'),
        createDeviceTimer('timers', 'timer-5-minute', '5 minut', 'PT5M'),
        createDeviceTimer('timers', 'timer-8-minute', '8 minut', 'PT8M'),
        createDeviceTimer('timers', 'timer-9-minute', '9 minut', 'PT9M'),
        createDeviceTimer('timers', 'timer-10-minute', '10 minut', 'PT10M'),
        createDeviceTimer('timers', 'timer-10a-minute', '10 minut', 'PT10M'),
        createDeviceTimer('timers', 'timer-12-minute', '12 minut', 'PT12M'),
        createDeviceTimer('timers', 'timer-15-minute', '15 minut', 'PT15M'),
        createDeviceTimer('timers', 'timer-20-minute', '20 minut', 'PT20M'),
        createDeviceTimer('timers', 'timer-30-minute', '30 minut', 'PT30M'),
        createDeviceTimer('timers', 'timer-60-minute', '60 minut', 'PT60M'),
        createDeviceTimer('timers', 'timer-90-minute', '90 minut', 'PT90M'),
        createDeviceTimer('timers', 'timer-120-minute', '120 minut', 'PT120M'),
        createDeviceTimer('timers', 'timer-180-minute', '180 minut', 'PT180M'),
    
        createDeviceBlinds(['homepanel', 'roleta-kuchnia', 'Kuchnia']),
        createDeviceBlinds(['homepanel', 'roleta-jadalnia-drzwi', 'Jadalnia (drzwi)']),
        createDeviceBlinds(['homepanel', 'roleta-jadalnia-lewa', 'Jadalnia (lewa)']),
        createDeviceBlinds(['homepanel', 'roleta-jadalnia-prawa', 'Jadalnia (prawa)']),
        createDeviceBlinds(['homepanel', 'roleta-salon-lewa', 'Salon (lewa)']),
        createDeviceBlinds(['homepanel', 'roleta-salon-prawa', 'Salon (prawa)']),
        createDeviceBlinds(['homepanel', 'roleta-gabinet', 'Gabinet']),
        createDeviceBlinds(['homepanel', 'roleta-goscinny', 'Duży pokój']),
        createDeviceBlinds(['homepanel', 'roleta-dziecko', 'Mały pokój']),
        createDeviceBlinds(['homepanel', 'roleta-sypialnia', 'Sypialnia']),
        createDeviceBlinds(['homepanel', 'roleta-lazienka', 'Łazienka']),
        createDeviceBlinds(['homepanel', 'roleta-polaciowa-dziecko', 'Mały pokój (połaciowa)']),
        createDeviceBlinds(['homepanel', 'roleta-polaciowa-sypialnia-lozko', 'Sypialnia (połaciowa)']),
        createDeviceBlinds(['homepanel', 'roleta-polaciowa-sypialnia-garderoba', 'Garderoba (połaciowa)']),
        createDeviceBlinds(['homepanel', 'roleta-polaciowa-gabinet-lewa', 'Gabinet (połaciowa lewa)']),
        createDeviceBlinds(['homepanel', 'roleta-polaciowa-gabinet-prawa', 'Gabinet (połaciowa prawa)']),
        createDeviceBlinds(['homepanel', 'roleta-polaciowa-goscinny-lewa', 'Duży pokój (połaciowa lewa)']),
        createDeviceBlinds(['homepanel', 'roleta-polaciowa-goscinny-prawa', 'Duży pokój (połaciowa prawa)']),  
        {
            deviceClass: 'BlindsGroupDevice',
            args: ['rolety-grupa-salon', 'Salon (obie)', [
                'roleta-salon-lewa', 'roleta-salon-prawa' 
            ]]
        },  
        {
            deviceClass: 'BlindsGroupDevice',
            args: ['rolety-grupa-parter', 'Parter', [
                'roleta-salon-lewa', 
                'roleta-salon-prawa',
                'roleta-jadalnia-lewa', 
                'roleta-jadalnia-prawa', 
                'roleta-salon-lewa', 
                'roleta-kuchnia', 
                'roleta-jadalnia-drzwi', 
            ]]
        },     
        {
            deviceClass: 'BlindsGroupDevice',
            args: ['rolety-grupa-pietro-okna-sypialnie', 'Sypialnie + łazienka', [
                'roleta-goscinny', 
                'roleta-dziecko',
                'roleta-sypialnia',
                'roleta-lazienka',
            ]]
        },      
        {
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'onewire-sensor-grunt-0', 'Grunt 0cm',]
        }, {
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'ble-sensor-00126f6d3a29', 'Prąd',]
        }, {
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'water-meter-main', 'Wodomierz główny',]
        }, {
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'water-meter-garden', 'Wodomierz ogród',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-lazienka-pietro-okno', 'Łazienka piętro okno',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-brama-garazowa', 'Brama garażwa',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-brama-ogrodzenia', 'Brama ogrodzenia',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-gabinet-okno', 'Gabinet okno',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-sypialnia-okno', 'Sypialnia okno',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-nina-okno', 'Mały pokój okno',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-goscinny-okno', 'Duży pokój okno',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-gabinet-okno-polaciowe', 'Gabinet okno połąciowe',]
        }, {
            deviceClass: 'DoorSensorDevice', 
            args: ['homepanel', 'kontaktron-garderoba-okno-polaciowe', 'Garderoba okno połąciowe',]
        }, { 
            deviceClass: 'HPRadiatorThermostatDevice', 
            args: ['homepanel', 'termostat-sypialnia', 'Termostat sypialnia']
        }, { 
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'owire-sensor-co-zasilanie', 'CO zasilanie']
        }, { 
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'owire-sensor-co-powrot', 'CO powrót']
        }, { 
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'owire-sensor-co-powrot-dol', 'CO powrót dół']
        }, { 
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'owire-sensor-co-powrot-gora', 'CO powrót góra']
        }, { 
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'owire-sensor-cwu-zasilanie', 'CWU zasilanie']
        }, { 
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'owire-sensor-cwu-powrot', 'CWU powrót']
        }, { 
            deviceClass: 'CompositeValueDevice', 
            args: ['homepanel', 'pmsensor', 'Sensor PM']
        }, { 
            deviceClass: 'SimpleValueDevice', 
            args: ['homepanel', 'heating-status', 'Piec grzanie']
        }, { 
            deviceClass: 'PingDevice', 
            args: ['homepanel', 'ping-bartek-galaxy', 'Ping Bartek Galaxy']
        }, { 
            deviceClass: 'TemperatureSensorDevice', 
            args: ['mock-1', 'mock-temperature-1', 'Mock 1',]
        }, {
            deviceClass: 'TemperatureSensorDevice', 
            args: ['met-no-1', 'met-no-wroclaw-temperature', 'Wrocław',]
        }, 
    
        createDevice('PingDevice', ['homepanel', 'ping-pi-bluetooth2', 'Ping pi-bt2']),
        createDevice('PingDevice', ['homepanel', 'ping-ipcam-garaz', 'Ping webcam garaż']),
        createDevice('PingDevice', ['homepanel', 'ping-ipcam-ogrodek', 'Ping webcam ogródek']),
        createDevice('PingDevice', ['homepanel', 'ping-ipcam-ulica', 'Ping webcam ulica']),
        createDevice('PingDevice', ['homepanel', 'ping-ipcam-kotlownia', 'Ping webcam kotłownia']),
        createDevice('PingDevice', ['homepanel', 'ping-tatooine', 'Ping tatooine']),
        createDevice('PingDevice', ['homepanel', 'ping-hoth', 'Ping hoth']),
        createDevice('PingDevice', ['homepanel', 'ping-loxone', 'Ping Loxone']),
        createDevice('PingDevice', ['homepanel', 'ping-hmlan1', 'Ping hmlan1']),
        createDevice('PingDevice', ['homepanel', 'ping-printer', 'Ping printer']),
        createDevice('PingDevice', ['homepanel', 'ping-pi-zero1', 'Ping pi-zero1']),
        createDevice('PingDevice', ['homepanel', 'ping-volumio-kuchnia', 'Ping volumio-kuchnia']),
        createDevice('PingDevice', ['homepanel', 'ping-pi-domek', 'Ping pi-domek']),
    ]
    
    
    
    const defaultIndicatorWidgetSources = [
        {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['onewire-sensor-grunt-0-source-temperature', 'Grunt 0', 'onewire-sensor-grunt-0', 'composite-value-to-temperature']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['ble-sensor-00126fc21c10-source-temperature', 'Serwerownia', 'ble-sensor-00126fc21c10']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['ble-sensor-4c65a8df6a72-source-temperature', 'Jadalnia', 'ble-sensor-4c65a8df6a72', null]
        }, {
            deviceClass: 'PowerMeterIndicatorWidgetSource', 
            args: ['power-meter-source', 'Prąd', 'ble-sensor-00126f6d3a29',]
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['kontaktron-lazienka-pietro-okno-door-source', 'Łazienka piętro', 'kontaktron-lazienka-pietro-okno']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['kontaktron-sypialnia-okno-door-source', 'Sypialnia', 'kontaktron-sypialnia-okno']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['kontaktron-nina-okno-door-source', 'Mały pokój', 'kontaktron-nina-okno']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['kontaktron-goscinny-okno-door-source', 'Duży pokój', 'kontaktron-goscinny-okno']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['kontaktron-gabinet-okno-door-source', 'Gabinet', 'kontaktron-gabinet-okno']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['kontaktron-gabinet-okno-polaciowe-door-source', 'Gabinet połaciowe', 'kontaktron-gabinet-okno-polaciowe']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['kontaktron-garderoba-okno-polaciowe-door-source', 'Garderoba połaciowe', 'kontaktron-garderoba-okno-polaciowe']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['brama-garazowa-door-source', 'Garaż', 'kontaktron-brama-garazowa']
        }, {
            deviceClass: 'DoorSensorIndicatorWidgetSource', 
            args: ['brama-ogrodzenia-door-source', 'Ogrodzenie', 'kontaktron-brama-ogrodzenia']
        }, {
            deviceClass: 'WaterMeterIndicatorWidgetSource', 
            args: ['water-meter-main-source', 'Wodomierz główny', 'water-meter-main']
        }, {
            deviceClass: 'WaterMeterIndicatorWidgetSource', 
            args: ['water-meter-garden-source', 'Wodomierz ogród', 'water-meter-garden']
        }, {
            deviceClass: 'ThermostatIndicatorWidgetSource', 
            args: ['sypialnia-termostat-source', 'Sypialnia grzejnik (okno)', 'termostat-sypialnia', 'thermostat-to-temperature']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['ble-sensor-00126fc21c3e-source-temperature', 'Na dworze', 'ble-sensor-00126fc21c3e']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['owire-sensor-co-zasilanie-as-temperature', 'CO zasilanie', 'owire-sensor-co-zasilanie', 'composite-value-to-temperature']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['owire-sensor-co-powrot-as-temperature', 'CO powrót', 'owire-sensor-co-powrot', 'composite-value-to-temperature']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['owire-sensor-co-powrot-dol-as-temperature', 'CO powrót dół', 'owire-sensor-co-powrot-dol', 'composite-value-to-temperature']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['owire-sensor-co-powrot-gora-as-temperature', 'CO powrót góra', 'owire-sensor-co-powrot-gora', 'composite-value-to-temperature']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['owire-sensor-cwu-zasilanie-as-temperature', 'CWU zasilanie', 'owire-sensor-cwu-zasilanie', 'composite-value-to-temperature']
        }, {
            deviceClass: 'TemperatureIndicatorWidgetSource', 
            args: ['owire-sensor-cwu-powrot-as-temperature', 'CWU powrót', 'owire-sensor-cwu-powrot', 'composite-value-to-temperature']
        }, {
            deviceClass: 'NumberIndicatorWidgetSource', 
            args: ['pmsensor-25-source-number', 'PM Sensor 2.5', 'pmsensor', 'pmsensor-25-as-number']
        }, {
            deviceClass: 'NumberIndicatorWidgetSource', 
            args: ['pmsensor-10-source-number', 'PM Sensor 10', 'pmsensor', 'pmsensor-10-as-number']
        }, {
            deviceClass: 'WarningIndicatorWidgetSource', 
            args: ['heating-status-source', 'Piec grzanie', 'heating-status', 'heating-status-as-boolean', 'svg/small/034-radiator.svg']
        }, {
            deviceClass: 'AvailabilityIndicatorWidgetSource', 
            args: ['pings-essentail-source', 'Ping ważne', [
                'ping-pi-bluetooth2',
                'ping-ipcam-garaz',
                'ping-ipcam-ogrodek',
                'ping-ipcam-ulica',
                'ping-ipcam-kotlownia',
                'ping-tatooine',
                'ping-hoth',
                'ping-loxone',
                'ping-hmlan1',
                'ping-pi-zero1',
                'ping-volumio-kuchnia',
                'ping-pi-domek'
            ] ]
        }, {
            deviceClass: 'AvailabilityIndicatorWidgetSource', 
            args: ['pings-bartek-galaxy-source', 'Ping Bartek Galaxy', ['ping-bartek-galaxy'] ]
        }
    ]
    
    
    const defaultValueClassifiers = [
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
    
    
    const defaultConverters = [
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
    
    
    
    const devices = [
        ...defaultDevicesConfiguration, 
        ...defaultIndicatorWidgetSources, 
        ...defaultValueClassifiers,
        ...defaultConverters,
    ]

    return devices
}())
