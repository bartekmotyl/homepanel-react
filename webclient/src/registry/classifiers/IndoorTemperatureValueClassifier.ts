import { ValueClass, ValueClassifier } from './ValueClassifier';

export class IndoorTemperatureValueClassifier extends ValueClassifier {
    public classify(value: string): string {
        let val = Number(value);
        if (val < 20.0) {
            return ValueClass.VeryLowTemperature
        } else if (val <= 21.0) {
            return ValueClass.LowTemperature
        } else if (val <= 22.0) {
            return ValueClass.StandardTemperature
        } else if (val <= 23.0) {
            return ValueClass.HighTemperature
        } else {
            return ValueClass.VeryHighTemperature
        }
    }
}