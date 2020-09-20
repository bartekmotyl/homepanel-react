// Actions to be dispatched to the middleware 
export const hphWsConnect = (url: string) => ({ type: 'HPH_WS_CONNECT', payload: url });
export const hphWsDisconnect = () => ({ type: 'HPH_WS_DISCONNECT' });
export const hphWsSend = (url: string) => ({ type: 'HPH_WS_SEND', payload: url });

// Actons dispatched by the middleware in response to webservice events 
export const hphWsConnected = (host: string) => ({ type: 'HPH_WS_CONNECTED', payload: host });
export const hphWsDisconnected = () => ({ type: 'HPH_WS_DISCONNECTED' });

/*
const websocketInitialState = {};

export const websocketReducer = (state = { ...websocketInitialState }, action) => {
  switch (action.type) {
    case 'HPH_WS_CONNECT':
      return { ...state, host: action.host };
    default:
      return state;
  }
};
*/