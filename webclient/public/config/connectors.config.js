(function() {
    const configConnectors = [
        { type: 'TimersConnector', id: 'timers'},
        { type: 'FHEMConnector', id: 'fhem-1', arg: {
            url: 'http://localhost:8083', 
            user: '', 
            password: '',
        }},
        { type: 'HAWebSocketConnector', id: 'ha', arg: {
            url: 'http://192.168.1.111:8123', 
            authCode: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwNTVhMmIzMDYxNGM0NjIxYTk3NDE5ZjcxODUwNGM1MiIsImlhdCI6MTY4MDgxNDE1MiwiZXhwIjoxOTk2MTc0MTUyfQ.XzFfYHNJuGpMslp1KA1170kenZOrbRX4QRrDiqTsWPE', 
            clientId: 'http://localhost:3000',
        }},        
    ]
    return configConnectors
}())
