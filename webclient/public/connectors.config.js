(function() {
    const configConnectors = [
        { type: 'HPWebSocketConnector', id: 'homepanel', arg: 'ws://192.168.1.111:8899' },
        //{ connector: 'mock', name: 'mock-1' },
        //{ connector: 'met.no', name: 'met-no-1' },
        { type: 'TimersConnector', id: 'timers', name: 'timers'},
        //{ connector: 'fhem', name: 'fhem-1', data: ['http://192.168.1.111:8083/fhem', 'fhem', 'fhem'] },
    ]

    return configConnectors
}())
