(function() {
    const createDevice = (clazz, args) => {
        return {
            deviceClass: clazz, 
            args: args,
        }
    }
    
    
    const devices = [
        createDevice('TemperatureSensorDevice', ['metno-1', 'tempParis', 'Paris']),
        createDevice('TemperatureSensorDevice', ['metno-1', 'tempSydney', 'Sydney']),
        createDevice('TemperatureSensorDevice', ['metno-1', 'tempNewYork', 'New York City']),
        createDevice('TemperatureSensorDevice', ['metno-1', 'tempLosAngeles', 'Los Angeles']),
        createDevice('TemperatureSensorDevice', ['metno-1', 'tempTokyo', 'Tokyo']),
    ]

    return devices
}())
