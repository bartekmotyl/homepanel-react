import { store } from "../app/store"

import { registerDevice } from "../devices/devicesSlice"
import { XiaomiTemperatureSensorDevice } from "../devices/implementations/custom/homepanel/XiaomiTemperatureSensorDevice"
import { INodeTemperatureSensorDevice } from "../devices/implementations/custom/homepanel/INodeTemperatureSensorDevice"
import { SwitchDevice } from "../devices/implementations/generic/SwitchDevice"
import { TemperatureSensorDevice } from "../devices/implementations/generic/TemperatureSensorDevice"
import { BlindsDevice } from "../devices/implementations/generic/BlindsDevice"
import { BlindsGroupDevice } from "../devices/implementations/generic/BlindsGroupDevice"
import { CompositeValueDevice } from "../devices/implementations/generic/CompositeValueDevice"
import { SimpleValueDevice } from "../devices/implementations/generic/SimpleValueDevice"
import { DoorSensorDevice } from "../devices/implementations/generic/DoorSensorDevice"
import { TimerDevice } from "../devices/implementations/generic/TimerDevice"
import { HPRadiatorThermostatDevice } from "../devices/implementations/custom/homepanel/HPRadiatorThermostatDevice"
import { PingDevice } from "../devices/implementations/custom/homepanel/PingDevice"
import { MediaMeterDevice } from "../devices/implementations/generic/MediaMeterDevice"
import { CompositeValueAsTemperatureConverter } from "../registry/converters/CompositeValueAsTemperatureConverter"
import { ThermostatAsTemperatureConverter } from "../registry/converters/ThermostatAsTemperatureConverter"
import { CompositeValueAsNumberConverter } from "../registry/converters/CompositeValueAsNumberConverter"
import { TemperatureIndicatorWidgetSource } from "../registry/indicators/TemperatureIndicatorWidgetSource"
import { Device } from "../devices/Device"
import { getDevicesConfig } from "./devicesConfig"
import { DoorSensorIndicatorWidgetSource } from "../registry/indicators/DoorSensorIndicatorWidgetSource"
import { ThermostatIndicatorWidgetSource } from "../registry/indicators/ThermostatIndicatorWidgetSource"
import { NumberIndicatorWidgetSource } from "../registry/indicators/NumberIndicatorWidgetSource"
import { SimpleValueAsBooleanConverter } from "../registry/converters/SimpleValueAsBooleanConverter"
import { WarningIndicatorWidgetSource } from "../registry/indicators/WarningIndicatorWidgetSource"
import { AvailabilityIndicatorWidgetSource } from "../registry/indicators/AvailabilityIndicatorWidgetSource"
import { NumberRangeValueClassifier } from "../registry/classifiers/NumberRangeValueClassifier"
import { MediaMeterIndicatorWidgetSource } from "../registry/indicators/MediaMeterIndicatorWidgetSource"
import { WindSensorDevice } from "../devices/implementations/generic/WindSensorDevice"
import { WindIndicatorWidgetSource } from "../registry/indicators/WindIndicatorWidgetSource"
import { HATemperatureSensorDevice } from "../devices/implementations/custom/ha/HATemperatureSensorDevice"
import { HACoverDevice } from "../devices/implementations/custom/ha/HACoverDevice"
import { HABinarySensorDevice } from "../devices/implementations/custom/ha/HABinarySensorDevice"
import { HASensorDevice } from "../devices/implementations/custom/ha/HASensorDevice"
import { HASwitchDevice } from "../devices/implementations/custom/ha/HASwitchDevice"
import { HPDummyTemperatureSensorDevice } from "../devices/implementations/custom/homepanel/HPDummyTemperatureSensorDevice"

const knownTypes: any = {
  XiaomiTemperatureSensorDevice,
  INodeTemperatureSensorDevice,
  SwitchDevice,
  BlindsDevice,
  CompositeValueDevice,
  SimpleValueDevice,
  TemperatureSensorDevice,
  DoorSensorDevice,
  HPRadiatorThermostatDevice,
  PingDevice,
  BlindsGroupDevice,
  TimerDevice,
  MediaMeterDevice,
  WindSensorDevice,
  CompositeValueAsTemperatureConverter,
  CompositeValueAsNumberConverter,
  ThermostatAsTemperatureConverter,
  SimpleValueAsBooleanConverter,
  TemperatureIndicatorWidgetSource,
  DoorSensorIndicatorWidgetSource,
  ThermostatIndicatorWidgetSource,
  NumberIndicatorWidgetSource,
  WarningIndicatorWidgetSource,
  AvailabilityIndicatorWidgetSource,
  NumberRangeValueClassifier,
  MediaMeterIndicatorWidgetSource,
  WindIndicatorWidgetSource,
  HATemperatureSensorDevice,
  HABinarySensorDevice,
  HACoverDevice,
  HASensorDevice,
  HASwitchDevice,
  HPDummyTemperatureSensorDevice,
}
const windowUrl = window.location.search
const params = new URLSearchParams(windowUrl)

console.log(`params['config']: ${params.get("config")}`)

export const configFolderPath =
  params.get("config") ?? process.env.REACT_APP_CONFIG_FOLDER_PATH ?? "config"

const configParamsJSONEncoded = params.get("configParams")
if (configParamsJSONEncoded) {
  console.log(`configParamsJSONEncoded: ${configParamsJSONEncoded}`)
  const decoded = decodeURI(configParamsJSONEncoded)
  console.log(`decoded: ${decoded}`)
  const configParams = JSON.parse(decoded)
  ;(window as any).configParams = configParams
}

const createDeviceDynamically = (deviceClass: string, args: any) => {
  if (
    knownTypes[deviceClass] === undefined ||
    knownTypes[deviceClass] === null
  ) {
    throw new Error(`Class type of '${deviceClass}' is not known.`)
  }
  return new knownTypes[deviceClass](...[deviceClass, ...args])
}

export const configureDevices = async () => {
  const configDevices = await getDevicesConfig()
  const dynamicDevices = configDevices.map(
    (devCfg) =>
      createDeviceDynamically(devCfg.deviceClass, devCfg.args) as Device
  )

  dynamicDevices.forEach((dev) => {
    store.dispatch(registerDevice(dev))
  })
}
