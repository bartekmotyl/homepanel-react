import { RadiatorThermostatInfo } from '../../devices/interfaces/generic/genericDevices';
import { TemperatureIndicatorWidgetSource } from './TemperatureIndicatorWidgetSource';


export class ThermostatIndicatorWidgetSource extends TemperatureIndicatorWidgetSource  {

    public getExtraText1 () : string {
        const device = this.getRefDevice() as any as RadiatorThermostatInfo;
        const valve = device.getValvePosition();
        if (!valve)
            return "";
        return valve.toFixed() ?? "";
    }

    public getExtraText2 () : string {
        let device = this.getRefDevice() as any as  RadiatorThermostatInfo;
        const desiredTemperature = device.getDesiredTemperature();
        if (!desiredTemperature)
            return "";
        return desiredTemperature.toFixed(1) ?? "";        
    }

}
