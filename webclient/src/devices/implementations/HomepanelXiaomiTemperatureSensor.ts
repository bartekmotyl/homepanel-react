import { Temperature, Humidity } from '../interfaces/device-interfaces';
import { Record } from 'immutable';
import { IDevice } from 'devices/Device';

interface ITemperatureHumiditySensorRecord {
  temperature: number;
  humidity: number;
}

const TemperatureHumiditySensorRecordFactory = Record({
  temperature: 11,
  humidity: 12,
});

export abstract class HomepanelDevice implements IDevice {
  abstract acceptData(data: any): HomepanelDevice;
  abstract dump(): string;
}

export class TemperatureHumiditySensor
  implements IDevice, Temperature, Humidity {
  constructor(data = undefined) {
    this.data = TemperatureHumiditySensorRecordFactory(data);
  }

  acceptData(data: any): TemperatureHumiditySensor {
    return new TemperatureHumiditySensor(data);
  }

  data: ITemperatureHumiditySensorRecord;

  getTemperature(): number | null {
    return this.data.temperature;
  }
  getHumidity(): number | null {
    return this.data.humidity;
  }

  dump(): string {
    return JSON.stringify(this.data);
  }
}
