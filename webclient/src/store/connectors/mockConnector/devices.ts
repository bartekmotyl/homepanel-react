import { Device } from 'devices/Device';
import { Record } from 'immutable';
import { Temperature } from 'devices/interfaces/device-interfaces';

export abstract class MockDevice extends Device {
  abstract generateNextState(): MockDevice;
}

interface ITemperatureSensorRecord {
  temp: number;
}

const MockTemperatureSensorRecordFactory = Record({
  temp: 33,
});

export class MockTemperatureSensor extends MockDevice implements Temperature {
  constructor(data: ITemperatureSensorRecord | undefined = undefined) {
    super();
    this.data = MockTemperatureSensorRecordFactory(data);
  }

  generateNextState(): MockTemperatureSensor {
    let updated = new MockTemperatureSensor({
      temp: 20 + Math.floor(Math.random() * 50) / 10.0,
    });
    return updated;
  }

  data: ITemperatureSensorRecord;

  get T(): number | null {
    return this.data.temp;
  }
}
