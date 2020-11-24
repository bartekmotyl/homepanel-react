import { ValueClass, ValueClassifier } from './ValueClassifier';

export class OutdoorTemperatureValueClassifier extends ValueClassifier {
    public classify(value: string): string {
        let val = Number(value);
        if (val < 0.0) {
            return ValueClass.VeryLowTemperature
        } else if (val <= 15.0) {
            return ValueClass.LowTemperature
        } else if (val <= 25.0) {
            return ValueClass.StandardTemperature
        } else if (val <= 30.0) {
            return ValueClass.HighTemperature
        } else {
            return ValueClass.VeryHighTemperature
        }
    }
}