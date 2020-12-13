
import {  DeviceBase } from "../../Device";
import { Blinds } from "../../interfaces/generic/genericDevices";
import { store } from '../../../app/store';

export class BlindsGroupDevice extends DeviceBase implements Blinds {
  protected blindsDevices: string[]

  constructor(deviceId: string, name: string, blindsDevices: string[]) {
    super(deviceId, name)
    this.blindsDevices = blindsDevices;
  }

  getBlindsDevices() : Blinds[] {
    return this.blindsDevices.map(deviceId =>  
      store.getState().devices.map.get(deviceId)! as any as Blinds);
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