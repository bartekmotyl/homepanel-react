import { TimersConnector } from './timers/timersConnector'
import { HPWebSocketConnector } from './hpHeadless/hpHeadlessConnector'
import { IConnector } from './connectorsMiddleware';

const knownTypes: any = {
    HPWebSocketConnector, 
    TimersConnector
}



export const createConnectorDynamically = (clazz: string, id: string): IConnector => {
    if (knownTypes[clazz] === undefined || knownTypes[clazz] === null) {
        throw new Error(`Class type of '${clazz}' is not known.`);
    }
    return new knownTypes[clazz](id);    
}