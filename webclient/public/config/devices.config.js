(function() {
    const createDevice = (clazz, args) => {
        return {
            deviceClass: clazz, 
            args: args,
        }
    }
    
    const createDeviceTimer = (connectorId, deviceId, name, duration) => {
        return createDevice('TimerDevice', [connectorId, deviceId, name, duration])
    }
    
    const devices = [
        createDeviceTimer('timers', 'timer-1-minute', '1 minute', 'PT1M'),
        createDeviceTimer('timers', 'timer-2-minute', '2 minutes', 'PT2M'),
        createDeviceTimer('timers', 'timer-5-minute', '5 minutes', 'PT5M'),
        createDeviceTimer('timers', 'timer-10-minute', '10 minutes', 'PT10M'),
        createDeviceTimer('timers', 'timer-20-minute', '20 minutes', 'PT20M'),
        createDeviceTimer('timers', 'timer-30-minute', '30 minutes', 'PT30M'),
        createDevice('TemperatureSensorDevice', ['fhem-1', 'tempOffice', 'Office']),
        createDevice('TemperatureSensorDevice', ['fhem-1', 'tempBedroom', 'Bedroom']),
        createDevice('SwitchDevice', ['fhem-1', 'lightOffice', 'Office']),
        createDevice('SwitchDevice', ['fhem-1', 'lightBedroom', 'Bedroom']),
        createDevice('BlindsDevice', ['fhem-1', 'blindsOffice', 'Office']),      
        createDevice('BlindsDevice', ['fhem-1', 'blindsBedroom', 'Bedroom']),      
        createDevice('DoorSensorDevice', ['fhem-1', 'windowSensorOffice', 'Office (window)']),      
        createDevice('MediaMeterDevice', ['fhem-1', 'PowerMeter', 'Power', 'Power', 60.0]),        
        createDevice('MediaMeterDevice', ['fhem-1', 'WaterMeter', 'Water', 'Water', 1.0]),        
        //        
        createDevice('TemperatureIndicatorWidgetSource', ['tempOffice-source', 'Office', 'tempOffice']),   
        createDevice('TemperatureIndicatorWidgetSource', ['tempBedroom-source', 'Bedroom', 'tempBedroom']),   
        createDevice('DoorSensorIndicatorWidgetSource', ['windowSensorOffice-source', 'Office (window)', 'windowSensorOffice']),
        createDevice('MediaMeterIndicatorWidgetSource', ['PowerMeter-source', 'Power', 'PowerMeter', 'W']),
        createDevice('MediaMeterIndicatorWidgetSource', ['WaterMeter-source', 'Water', 'WaterMeter', 'l']),

        createDevice('NumberRangeValueClassifier', [
            'indoor-range-temperature-classifier', [ 
                { value: 20.0, color: 'VeryLowTemperature'},
                { value: 21.0, color: 'LowTemperature'},
                { value: 22.0, color: 'StandardTemperature'},
                { value: 23.0, color: 'HighTemperature'},
                { value: null, color: 'VeryHighTemperature'},
            ]
        ]),       
        createDevice('NumberRangeValueClassifier', [
            'power-meter-range-classifier-minute', [ 
                { value: 500, color: 'Normal'},
                { value: 2000, color: 'Information'},
                { value: 4000, color: 'Warning'},
                { value: null, color: 'Error'},
            ]
        ]), 
        createDevice('NumberRangeValueClassifier', [
            'water-meter-range-value-classifier', [ 
                { value: 1, color: 'Normal'},
                { value: 2, color: 'Information'},
                { value: 4, color: 'Warning'},
                { value: 6, color: 'Error'},
                { value: 10, color: 'Critical'},
                { value: null, color: 'Disaster'},
            ]
        ]),                     
    ]

    return devices
}())
