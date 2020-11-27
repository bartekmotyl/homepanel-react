import { ValueClass, ValueClassifier } from './ValueClassifier';

export class AirQualityPM2_5ValueClassifier extends ValueClassifier {
    public classify(value: string): string {
        let val = Number(value);
        if (val < 12.0) {
            return ValueClass.Normal
        } else if (val <= 36.0) {
            return ValueClass.Information
        } else if (val <= 60.0) {
            return ValueClass.Warning
        } else if (val <= 84.0) {
            return ValueClass.Error
        } else if (val <= 120.0) {
            return ValueClass.Critical
        } else {
            return ValueClass.Disaster
        } 
    }
}
