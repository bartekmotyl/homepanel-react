import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

export interface IConnector {
    getId(): string,
    connect(store: MiddlewareAPI, config?: any): void,
    disconnect(): void,
    processAction(store: MiddlewareAPI, action: PayloadAction<any>): void,
}

const connectors = new Map<string, IConnector>()

export const registerConnector = (connector: IConnector) => {
    connectors.set(connector.getId(), connector)
}


export const connectorsMiddleware: Middleware = api => next => (action: PayloadAction<any>) => {
    const parts = action.type.split('/')
    if (parts.length > 2 && parts[0] === 'connector') {
        const connectorId = parts[1]
        const connector = connectors.get(connectorId)
        connector?.processAction(api, action)
    }
    return next(action);
};
 