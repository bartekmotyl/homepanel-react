(function() {
    const createDevice = (clazz, args) => {
        return {
            deviceClass: clazz, 
            args: args,
        }
    }
    
    const devices = [
        createDevice('HATemperatureSensorDevice', ['ha', 'sensor.outside_temperature', 'Outside']),
        createDevice('TemperatureIndicatorWidgetSource', ['sensor.outside_temperature-source', 'Outside', 'sensor.outside_temperature']), 

        createDevice('HACoverDevice', ['ha', 'cover.kitchen_window', 'Kitchen window']),    
        createDevice('DoorSensorIndicatorWidgetSource', ['cover.kitchen_window-source', 'Kitchen window', 'cover.kitchen_window']),

        createDevice('HACoverDevice', ['ha', 'cover.hall_window', 'Hall window']),    
        createDevice('DoorSensorIndicatorWidgetSource', ['cover.hall_window-source', 'Hall window', 'cover.hall_window']),

        createDevice('HACoverDevice', ['ha', 'cover.living_room_window', 'Living room window']),    
        createDevice('DoorSensorIndicatorWidgetSource', ['cover.living_room_window-source', 'Living room window', 'cover.living_room_window']),

        createDevice('HACoverDevice', ['ha', 'cover.garage_door', 'Garage door']),    
        createDevice('DoorSensorIndicatorWidgetSource', ['cover.garage_door-source', 'Garage door', 'cover.garage_door']),

        createDevice('HACoverDevice', ['ha', 'cover.pergola_roof', 'Pergola roof']),    
        createDevice('DoorSensorIndicatorWidgetSource', ['cover.pergola_roof-source', 'Pergola roof', 'cover.pergola_roof']),

        createDevice('HASensorDevice', ['ha', 'sensor.power_consumption', 'Power', 'Power']), 
        createDevice('MediaMeterIndicatorWidgetSource', ['sensor.power_consumption-source', 'Power', 'sensor.power_consumption', 'W']),
        
        createDevice('HASwitchDevice', ['ha', 'light.bed_light', 'Bed light', 'light']),
        createDevice('HASwitchDevice', ['ha', 'switch.decorative_lights', 'Decorative lights', 'switch']),
        
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
            'outdoor-range-temperature-classifier', [ 
                { value: 0.0, color: 'VeryLowTemperature'},
                { value: 15.0, color: 'LowTemperature'},
                { value: 25.0, color: 'StandardTemperature'},
                { value: 30.0, color: 'HighTemperature'},
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
    ]

    return devices
}())
