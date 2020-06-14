import { IDevice } from 'devices/Device';
import { Temperature } from 'devices/interfaces/device-interfaces';

export abstract class MockDevice implements IDevice {
  abstract generateNextState(): MockDevice;
  abstract dump(): string;
}

export class MockTemperatureSensor extends MockDevice implements Temperature {
  temp?: number;

  constructor(temp: number | undefined = undefined) {
    super();
    this.temp = temp;
  }
  generateNextState(): MockTemperatureSensor {
    return new MockTemperatureSensor(
      20 + Math.floor(Math.random() * 50) / 10.0,
    );
  }
  get T(): number | null {
    return this.temp || null;
  }
  dump(): string {
    return JSON.stringify(this);
  }
}

/*

class MockLight extends Record({
  name: '',
  placeholder: '',
  age: null as number | null,
}) {
  
}
*/
