export interface Temperature {
  getTemperature(): number | null;
}

export interface Humidity {
  getHumidity(): number | null;
}

export interface Light {
  getState(): boolean | null;
}

export interface TextRepresentation {
  getStateAsText(): string | null;
}

export interface Switch extends Light {
  toggle(): void;
  off(): void;
  on(): void;
}

export interface TimedSwitch extends Switch {
  onForTime(seconds: number): void;
}

export interface PushButton {
  push(): void;
  longPress(): void;
}

export interface BatteryOperated {
  getBattery(): number | null;
  isBatteryOk(): boolean | null;
}

export interface Gauge {
  getGaugeValue(): number | null;
}

export interface Counter {
  getCounterValue(): number | null;
}

export interface ProximitySensor {
  getProximityState(): boolean | null;
}

export interface DoorSensor {
  isClosed(): boolean | null;
}

export interface Blinds {
  up(): void;
  down(): void;
  stepUp(): void;
  stepDown(): void;
  stop(): void;
}

export interface PositionableBlinds extends Blinds {
  setPosition(position: number): void;
  getPosition(): number | null;
}

export interface Dimmer {
  more(): void;
  less(): void;
  on(): void;
  off(): void;
}

export interface CompositeValue {
  getValue(property: string): any;
}  

export interface SimpleValue {
  getValue(): any;
}  

export interface RadiatorThermostatInfo  {
  getCurrentTemperature() :number | null;
  getDesiredTemperature() : number | null;
  getValvePosition(): number | null;
}

export interface AvailabilityChecker {
  isAvailable(): boolean | null;
}
