import { createConnectorDynamically } from "../middleware/connectorsFactory";
import { MiddlewareAPI } from "@reduxjs/toolkit";
import { fetchTextAsync } from "../utils/fetchUtils";
import { registerConnector } from "../middleware/connectorsMiddleware";

export interface  ConnectorConfiguration {
    type: string, 
    id: string, 
    arg: any,
}

export const configureConnectors = async (store: MiddlewareAPI) => { 
    const url = "config/connectors.config.js"
    const configConnectorsJs = await fetchTextAsync(url);
    // eslint-disable-next-line no-eval
    const configConnectors = eval(configConnectorsJs) as ConnectorConfiguration[]
    configConnectors.forEach(cfg => {
        const connector = createConnectorDynamically(cfg.type, cfg.id)
        registerConnector(connector)
        connector.connect(store, cfg.arg)
    })
}
