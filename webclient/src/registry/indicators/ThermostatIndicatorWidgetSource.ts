import { RadiatorThermostatInfo } from '../../devices/interfaces/generic/genericDevices'
import { asInterface } from '../../utils/cast'
import { TemperatureIndicatorWidgetSource } from './TemperatureIndicatorWidgetSource'

/**
 * Special variant of TemperatureIndicatorWidgetSource which assumes the referenced device implements RadiatorThermostatInfo.
 * This source returns (in addition to current temperature, returned by TemperatureIndicatorWidgetSource) 
 * also current valve position as well as desired temperature.  
 * This source requires to be combined with a value classifier as it does not return any colors.
*/
export class ThermostatIndicatorWidgetSource extends TemperatureIndicatorWidgetSource  {

    public getExtraText1 () : string {
        const device = asInterface<RadiatorThermostatInfo>(this.refDeviceId, this.getRefDevice())
        const valve = device.getValvePosition()
        if (!valve)
            return ""
        return valve.toFixed() ?? ""
    }

    public getExtraText2 () : string {
        let device = asInterface< RadiatorThermostatInfo>(this.refDeviceId, this.getRefDevice())
        const desiredTemperature = device.getDesiredTemperature()
        if (!desiredTemperature)
            return ""
        return desiredTemperature.toFixed(1) ?? "";        
    }

}
