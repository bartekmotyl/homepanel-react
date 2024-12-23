import { MiddlewareAPI } from "redux"
import { AnyAction, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { DeviceUpdate } from "../../devices/Device"
import { IConnector } from "../connectorsMiddleware"
import { RootState } from "../../app/store"
import { debugEnabled } from "../../utils/debugUtils"

const debug = debugEnabled

export class HPWebSocketConnector implements IConnector {
  private connectorId: string
  private adapters: Map<string, DeviceAdapter> = new Map<
    string,
    DeviceAdapter
  >()
  private socket: WebSocket | null = null
  private config: any
  private active: boolean = false

  public constructor(connectorId: string) {
    this.connectorId = connectorId

    this.adapters.set("WindSensorDevice", new WindSensorDeviceAdapter())

    setInterval(() => {
      if (this.active) {
        const isValid = this.socket && this.socket.readyState === WebSocket.OPEN
        if (isValid) {
          this.socket?.send("ping")
        }
      }
    }, 60 * 1000)
  }

  public getId(): string {
    return this.connectorId
  }

  public connect(store: MiddlewareAPI, config?: any) {
    this.config = config
    this.active = true
    this.reconnect(store)
  }

  public disconnect() {
    this.active = false
    if (this.socket !== null) {
      this.socket.close()
    }
    this.socket = null
    this.config = null
  }

  public processAction(store: MiddlewareAPI, action: PayloadAction<any>): void {
    switch (action.type) {
      case `connector/${this.connectorId}/device/switch/toggle`:
        this.sendAction(action.payload.deviceId, "toggle")
        break
      case `connector/${this.connectorId}/device/blinds/up`:
        this.sendAction(action.payload.deviceId, "moveUp")
        break
      case `connector/${this.connectorId}/device/blinds/down`:
        this.sendAction(action.payload.deviceId, "moveDown")
        break
      case `connector/${this.connectorId}/device/blinds/stop`:
        this.sendAction(action.payload.deviceId, "stopMove")
        break
    }
  }

  private reconnect = (store: MiddlewareAPI) => {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close()
    }
    debug && console.log(`Home panel websocket: connecting to: ${this.config}`)

    // connect to the remote host
    this.socket = new WebSocket(this.config)

    // websocket handlers
    this.socket.onmessage = this.onMessage(store)
    this.socket.onclose = this.onClose(store)
    this.socket.onopen = this.onOpen(store)
    this.socket.onerror = this.onError(store)
  }

  private sendAction = (deviceId: string, action: string) => {
    debug && console.log(`sending action: ${action} to ${deviceId}`)
    const msg = JSON.stringify({
      messageType: "action",
      deviceId: deviceId,
      action: action,
    })
    this.socket?.send(msg)
  }

  private onOpen(store: MiddlewareAPI) {
    return (ev: Event) => {
      debug && console.log(`Home panel websocket: connected`)
      this.socket?.send(JSON.stringify({ messageType: "requestStateAll" }))
    }
  }

  private onClose(store: MiddlewareAPI) {
    return (ev: CloseEvent) => {
      debug && console.log(`Home panel websocket close`, ev)
      if (this.active) {
        setTimeout(() => this.reconnect(store), 1000)
      }
    }
  }

  private onError(_store: MiddlewareAPI) {
    return (ev: Event) => {
      debug && console.log(`Home panel websocket error`, ev)
      this.socket?.close()
    }
  }

  private onMessage(store: MiddlewareAPI) {
    return (event: MessageEvent) => {
      //   debug && console.log(`Home panel websocket message received: ${event.data}`)
      var payload = JSON.parse(event.data)
      if (payload.messageType === "deviceState") {
        const deviceData: DeviceUpdate = {
          deviceId: payload.device,
          data: payload.data,
          timestamp: payload.timestamp,
          upToDate: payload.activeAttributes.length > 0,
        }

        const devices = (store.getState() as RootState).devices
        if (devices.map.has(payload.device)) {
          const dev = devices.map.get(payload.device)!
          const clazz = dev.getClass()
          const adapter = this.adapters.get(clazz)
          if (adapter) {
            const adaptedUpdate = adapter.accept(store, payload)
            if (adaptedUpdate) {
              deviceData.data = adaptedUpdate
            }
          }
          store.dispatch({ type: "devices/deviceUpdate", payload: deviceData })
        } else {
          // update of a headless device that is currently not used in web
        }
      }
    }
  }
}

interface DeviceAdapter {
  accept(store: MiddlewareAPI, payload: any): any
}

class WindSensorDeviceAdapter implements DeviceAdapter {
  public accept(
    store: MiddlewareAPI<Dispatch<AnyAction>, any>,
    payload: any
  ): any {
    const converted = {
      windSpeedMeterSecond: payload.data.wind_avg_m_s,
      maxWindSpeedMeterSecond: payload.data.wind_max_m_s,
    }
    return converted
  }
}
