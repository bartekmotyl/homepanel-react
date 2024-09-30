import { store } from "../../app/store"
import { ConnectedDevice } from "../../devices/Device"
import { asInterface } from "../../utils/cast"
import { AsNumber } from "../converters/genericConverters"
import { IndicatorWidgetSource } from "./IndicatorWidgetSource"

export type NumberIndicatorWidgetSourceOptions = {
  precision: number
  factor: number
}

/**
 * NumberIndicatorWidgetSource takes a reference to a device (any)
 * and also takes reference to AsNumber converter.
 * Value provided by this source is obtained from referenced device and converted by given converter to a number.
 * This source requires to be combined with a value classifier as it does not return any colors.
 */
export class NumberIndicatorWidgetSource extends IndicatorWidgetSource {
  private converterId: string
  private refDeviceId: string
  private options?: NumberIndicatorWidgetSourceOptions

  constructor(
    sourceClass: string,
    sourceId: string,
    name: string,
    refDeviceId: string,
    converterId: string,
    options?: NumberIndicatorWidgetSourceOptions
  ) {
    super(sourceClass, sourceId, name)
    this.refDeviceId = refDeviceId
    this.converterId = converterId
    this.options = options
  }

  protected getRefDevice(): ConnectedDevice {
    return store
      .getState()
      .devices.map.get(this.refDeviceId)! as ConnectedDevice
  }

  protected getConverter() {
    return asInterface<AsNumber>(
      this.converterId,
      store.getState().devices.map.get(this.converterId)
    )
  }

  protected getNumber(): number | null {
    let device = this.getRefDevice()
    let converter = this.getConverter()

    if (!device) {
      return null
    }

    let value = converter.getNumber(device)
    return value
  }

  public getText(): string {
    let value = this.getNumber()

    if (value === null || value === undefined) {
      return "N/A"
    }
    if (typeof value !== "number") {
      return `${value}`
    }
    value = value * (this.options?.factor ?? 1)
    return value.toFixed(this.options?.precision ?? 1)
  }

  public getValue(): string | null {
    let value = this.getNumber()
    if (value !== null) {
      value = value * (this.options?.factor ?? 1)
      return value.toFixed(this.options?.precision ?? 1)
    } else {
      return null
    }
  }

  public getIsUpToDate(): boolean {
    return this.getRefDevice().isUpToDate()
  }
}
