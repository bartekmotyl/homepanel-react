import { hpHeadlessConnect, hphWebSocketMiddlewareFunction } from "../middleware/hpHeadless/hpHeadlessMiddleware";
import { metNoConnect, metNoMiddlewareFunction } from "../middleware/metNo/metNoMiddleware";
import { mockConnect, mockMiddlewareFunction } from "../middleware/mock/mockMiddleware";
import { store } from '../app/store';

export const connectorMiddlewares = [
    hphWebSocketMiddlewareFunction('homepanel'), 
    mockMiddlewareFunction('mock-1'),
    metNoMiddlewareFunction('met-no-1'),
];

export const initializeConnectors = () => {
    store.dispatch(hpHeadlessConnect('homepanel', 'ws://192.168.1.111:8899'));    
    store.dispatch(mockConnect('mock-1'));    
    store.dispatch(metNoConnect('met-no-1'));    
}