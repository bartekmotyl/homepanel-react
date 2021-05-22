import { toNumber } from "../../../utils/conversionUtils"
import { ConnectedDeviceBase } from "../../Device"
import { WindSensor } from "../../interfaces/generic/genericDevices"

export class WindSensorDevice extends ConnectedDeviceBase implements  WindSensor {
    getWindSpeedMetersSecond(): number | null {
        return toNumber(this.data?.windSpeedMeterSecond)
    }
    getMaxWindSpeedMetersSecond(): number | null {
        return toNumber(this.data?.maxWindSpeedMeterSecond)
    }
}