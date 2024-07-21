import { createConnectorDynamically } from "../middleware/connectorsFactory"
import { MiddlewareAPI } from "@reduxjs/toolkit"
import { registerConnector } from "../middleware/connectorsMiddleware"
import { configConnectors } from "../_custom/config"

export interface ConnectorConfiguration {
  type: string
  id: string
  arg: any
}

export const configureConnectors = async (store: MiddlewareAPI) => {
  configConnectors.forEach((cfg) => {
    const connector = createConnectorDynamically(cfg.type, cfg.id)
    registerConnector(connector)
    connector.connect(store, cfg.arg)
  })
}
