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
        createDevice('SwitchDevice', ['fhem-1', 'lightOffice', 'Office']),
        createDevice('BlindsDevice', ['fhem-1', 'blindsOffice', 'Office']),           
    ]

    return devices
}())
