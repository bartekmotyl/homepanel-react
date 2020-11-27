import { ValueClass, ValueClassifier } from './ValueClassifier';

export class AirQualityPM10ValueClassifier extends ValueClassifier {
    public classify(value: string): string {
        let val = Number(value);
        if (val < 20.0) {
            return ValueClass.Normal
        } else if (val <= 60.0) {
            return ValueClass.Information
        } else if (val <= 100.0) {
            return ValueClass.Warning
        } else if (val <= 140.0) {
            return ValueClass.Error
        } else if (val <= 200.0) {
            return ValueClass.Critical
        } else {
            return ValueClass.Disaster
        } 
    }
}
