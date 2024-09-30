import { Device, DeviceBase, DeviceUpdate } from "../../devices/Device"

export abstract class ValueClassifier extends DeviceBase {
  constructor(deviceClass: string, deviceId: string) {
    super(deviceClass, deviceId, "")
  }
  public acceptData(update: DeviceUpdate): Device {
    return this
  }
  public classify(value: string): ValueClass | string | null {
    return null
  }
}

export enum ValueClass {
  // https://htmlcolorcodes.com/
  // https://tailwindcolor.com/
  Normal = "#28b463",
  Information = "#d4ac0d",
  Warning = "#d68910",
  Error = "#ba4a00",
  Critical = "#cb4335",
  Disaster = "#a93226",

  VeryLowTemperature = "#2471a3",
  LowTemperature = "#138d75",
  StandardTemperature = "#28b463",
  HighTemperature = "#d68910",
  VeryHighTemperature = "#ba4a00",

  BalanceVeryPositive = "#8e44ad",
  BalancePositive = "#3498db",
  BalanceNormal = "#27ae60",
  BalanceNegative = "#27ae60",
  BalanceVeryNegative = "#e67e22",

  Undefined = "#707b7c",

  LevelLowest = "#a93226",
  LevelVeryLow = "#e67e22",
  LevelLow = "#d68910",
  LevelHalf = "#d4ac0d",
  LevelHigh = "#27ae60",
  LevelVeryHigh = "#28b463",
  LevelHighest = "#3bcb27",
}
type ValueClassKeyType = keyof typeof ValueClass

export const getStandardValue = (name: string) => {
  var found = Object.keys(ValueClass).find((key) => key === name)
  if (found) {
    return ValueClass[found as ValueClassKeyType]
  }
  return null
}
