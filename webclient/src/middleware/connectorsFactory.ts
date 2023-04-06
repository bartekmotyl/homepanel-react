import { TimersConnector } from "./timers/timersConnector"
import { HPWebSocketConnector } from "./hpHeadless/hpHeadlessConnector"
import { FHEMConnector } from "./fhem/fhemConnector"
import { MetNoConnector } from "./metNo/metNoConnector"
import { IConnector } from "./connectorsMiddleware"
import { HAWebSocketConnector } from "./ha/haConnector"

const knownTypes: any = {
  HPWebSocketConnector,
  TimersConnector,
  FHEMConnector,
  MetNoConnector,
  HAWebSocketConnector,
}

export const createConnectorDynamically = (
  clazz: string,
  id: string
): IConnector => {
  if (knownTypes[clazz] === undefined || knownTypes[clazz] === null) {
    throw new Error(`Class type of '${clazz}' is not known.`)
  }
  return new knownTypes[clazz](id)
}
