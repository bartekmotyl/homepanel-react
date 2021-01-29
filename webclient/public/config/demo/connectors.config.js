(function() {
    const configConnectors = [
        { type: 'TimersConnector', id: 'timers'},
        { type: 'FHEMConnector', id: 'fhem-1', arg: {
            url: 'http://localhost:8083', 
            user: '', 
            password: '',
        }},
    ]
    return configConnectors
}())
