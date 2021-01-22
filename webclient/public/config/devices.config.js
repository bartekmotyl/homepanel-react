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
    ]

    return devices
}())
