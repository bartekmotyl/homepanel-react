import {  DeviceBase } from "../../Device"
import { Blinds } from "../../interfaces/generic/genericDevices"
import { store } from '../../../app/store'
import { asInterface } from "../../../utils/cast"

export class BlindsGroupDevice extends DeviceBase implements Blinds {
  protected blindsDevices: string[]

  constructor(deviceClass: string, deviceId: string, name: string, blindsDevices: string[]) {
    super(deviceClass, deviceId, name)
    this.blindsDevices = blindsDevices
  }

  getBlindsDevices() : Blinds[] {
    return this.blindsDevices.map(deviceId =>  
        asInterface<Blinds>(deviceId, store.getState().devices.map.get(deviceId))!)
  }


  up(): void {
    this.getBlindsDevices().forEach(b=>b.up())
  }
  down(): void {
    this.getBlindsDevices().forEach(b=>b.down())
  }
  stepUp(): void {
    this.getBlindsDevices().forEach(b=>b.stepUp())
  }
  stepDown(): void{
    this.getBlindsDevices().forEach(b=>b.stepDown())
  }
  stop(): void{
    this.getBlindsDevices().forEach(b=>b.stop())
  }
}