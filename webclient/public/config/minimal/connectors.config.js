(function() {
    const configConnectors = [
        { type: 'TimersConnector', id: 'timers'},
        { type: 'MetNoConnector', id: 'metno-1', arg: [
            {lat: '48.856613', lon: '2.352222', deviceId: 'tempParis' },
            {lat: '-33.865', lon: '151.209444', deviceId: 'tempSydney' },
            {lat: '40.71274', lon: '-74.005974', deviceId: 'tempNewYork' },
            {lat: '34.05', lon: '-118.25', deviceId: 'tempLosAngeles' },
            {lat: '35.689722', lon: '139.692222', deviceId: 'tempTokyo' },
        ]},  
    ]
    return configConnectors
}())
