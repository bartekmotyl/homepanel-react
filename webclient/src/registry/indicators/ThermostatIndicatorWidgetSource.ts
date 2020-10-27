import { RadiatorThermostatInfo } from '../../devices/interfaces/generic/genericDevices';
import { TemperatureIndicatorWidgetSource } from './TemperatureIndicatorWidgetSource';


export class ThermostatIndicatorWidgetSource extends TemperatureIndicatorWidgetSource  {

    public get extraText1 () : string {
        const device = this.getSubDevice() as any as RadiatorThermostatInfo;
        const valve = device.getValvePosition();
        if (!valve)
            return "";
        return valve.toFixed() ?? "";
    }

    public get extraText2 () : string {
        let device = this.getSubDevice() as any as  RadiatorThermostatInfo;
        const desiredTemperature = device.getDesiredTemperature();
        if (!desiredTemperature)
            return "";
        return desiredTemperature.toFixed() ?? "";        
    }

}
