This middleware is an example of middleware that consumes WebSocket service (in this case HomePanelHeadless). 
The connection is kept open and in case of receiving updates from remote service appropriate updates are dispatched 
to the store (caught later by proper device).

This middleware also support sending data (i.e. execute actons on remote service). 