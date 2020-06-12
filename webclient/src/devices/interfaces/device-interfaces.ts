export interface Temperature {
  T: number | null;
}

export interface Humidity {
  H: number | null;
}

export interface Light {
  active: boolean | null;
}

export interface Switch extends Light {
  toggle(): void;
  off(): void;
  on(): void;
}

export interface PushButton {
  push(): void;
}

export interface BatteryOperated {
  battery: number | undefined;
  ok: boolean | undefined;
}
