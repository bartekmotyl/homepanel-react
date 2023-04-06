import { MiddlewareAPI } from "redux"
import { AnyAction, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { Device, DeviceUpdate } from "../../devices/Device"
import { IConnector } from "../connectorsMiddleware"
import { RootState } from "../../app/store"
import {
  createConnection,
  subscribeEntities,
  Connection,
  createLongLivedTokenAuth,
  HassEntities,
  HassEntity,
} from "home-assistant-js-websocket"

const debug = true

interface HAConfig {
  url: string
  authCode: string
  clientId: string
}

export class HAWebSocketConnector implements IConnector {
  private connectorId: string
  private adapters: Map<string, DeviceAdapter> = new Map<
    string,
    DeviceAdapter
  >()
  private connection: Connection | null = null
  private config?: HAConfig
  private active: boolean = false

  public constructor(connectorId: string) {
    this.connectorId = connectorId

    this.adapters.set("DoorSensorDevice", new DoorSensorDeviceAdapter())
    this.adapters.set(
      "TemperatureSensorDevice",
      new TemperatureSensorDeviceAdapter()
    )
    /*
    setInterval(() => {
      if (this.active) {
        const isValid = this.socket && this.socket.readyState === WebSocket.OPEN
        if (isValid) {
          this.socket?.send("ping")
        }
      }
    }, 60 * 1000)
    */
  }

  public getId(): string {
    return this.connectorId
  }

  public connect(store: MiddlewareAPI, config?: any) {
    this.config = config as HAConfig
    this.active = true
    this.reconnect(store)
  }

  public disconnect() {
    this.active = false
    if (this.connection) {
      this.connection.close()
    }
    this.connection = null
    this.config = undefined
  }

  public processAction(
    store: MiddlewareAPI,
    action: PayloadAction<any>
  ): void {}

  private reconnect = async (store: MiddlewareAPI) => {
    const auth = createLongLivedTokenAuth(
      this.config!.url,
      this.config!.authCode
    )
    this.connection = await createConnection({ auth })
    subscribeEntities(this.connection, this.onMessage(store))
  }

  private onMessage(store: MiddlewareAPI) {
    return (hassEntities: HassEntities) => {
      Object.entries(hassEntities).forEach(([key, entity]) => {
        debug && console.log(`${entity.entity_id}: ${entity.state}`)
        const deviceId = key
        const devices = (store.getState() as RootState).devices
        if (devices.map.has(deviceId)) {
          const dev = devices.map.get(deviceId)!
          const clazz = dev.getClass()
          const adapter = this.adapters.get(clazz)
          if (adapter) {
            const updateData = adapter.accept(store, entity)
            if (updateData) {
              const deviceData: DeviceUpdate = {
                deviceId: deviceId,
                data: updateData,
                timestamp: new Date(entity.last_updated),
                upToDate: true,
              }
              debug && console.log(`dispatching status update:`, deviceData)
              store.dispatch({
                type: "devices/deviceUpdate",
                payload: deviceData,
              })
            }
          }
        }
      })
    }
  }
}

interface DeviceAdapter {
  accept(store: MiddlewareAPI, payload: HassEntity): any
}

class DoorSensorDeviceAdapter implements DeviceAdapter {
  public accept(store: MiddlewareAPI, payload: HassEntity): any {
    return { state: payload.state === "on" ? "open" : "closed" }
  }
}

class TemperatureSensorDeviceAdapter implements DeviceAdapter {
  public accept(store: MiddlewareAPI, payload: HassEntity): any {
    return { temperature: payload.state }
  }
}
