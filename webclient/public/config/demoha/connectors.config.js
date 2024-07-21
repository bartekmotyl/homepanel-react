(function() {
    const configConnectors = [
        { type: 'TimersConnector', id: 'timers'},
        { type: 'HAWebSocketConnector', id: 'ha', arg: {
            url: 'http://192.168.1.111:9000', 
            authCode: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwOWQwYjI1M2M3MTU0ODViOGI4MDEyMDI0Mzg5NjBiMCIsImlhdCI6MTY4MDk2NTc5OSwiZXhwIjoxOTk2MzI1Nzk5fQ.u7-qLERwvlFE1uUW_wha3q05eYd2cvSx05QShRQobmo', 
            clientId: 'http://localhost:3000',
        }},        
    ]
    return configConnectors
}())
