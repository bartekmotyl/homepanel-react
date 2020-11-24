import { ValueClass, ValueClassifier } from './ValueClassifier';

export class HeatWaterTemperatureValueClassifier extends ValueClassifier {
    public classify(value: string): string {
        let val = Number(value);
        if (val < 30.0) {
            return ValueClass.StandardTemperature
        } else if (val <= 40.0) {
            return ValueClass.HighTemperature
        } else {
            return ValueClass.VeryHighTemperature
        } 
    }
}