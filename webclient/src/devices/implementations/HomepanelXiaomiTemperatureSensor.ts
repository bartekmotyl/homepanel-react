import { Temperature, Humidity } from '../interfaces/device-interfaces';
import { Record } from 'immutable';
import { Device } from 'devices/Device';

interface ITemperatureHumiditySensorRecord {
  temperature: number;
  humidity: number;
}

const TemperatureHumiditySensorRecordFactory = Record({
  temperature: 11,
  humidity: 12,
});

export abstract class HomepanelDevice extends Device {
  abstract acceptData(data: any): HomepanelDevice;
}

export class TemperatureHumiditySensor extends Device
  implements Temperature, Humidity {
  constructor(data = undefined) {
    super();
    this.data = TemperatureHumiditySensorRecordFactory(data);
  }

  acceptData(data: any): Device {
    return new TemperatureHumiditySensor(data);
  }

  data: ITemperatureHumiditySensorRecord;

  get T(): number | null {
    return this.data.temperature;
  }
  get H(): number | null {
    return this.data.humidity;
  }
}
