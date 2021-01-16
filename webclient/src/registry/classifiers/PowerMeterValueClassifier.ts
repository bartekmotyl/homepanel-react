import { ValueClass, ValueClassifier } from './ValueClassifier';

export class PowerMeterValueClassifier extends ValueClassifier {
    private factor: number
    constructor(deviceId: string, factor: number) {
        super(deviceId)
        // 1 minute -> 60.0 
        // 60 minutes -> 1.0
        this.factor = factor;
    }

    public classify(value: string): string {
        let val = Number(value);
        if (!val) {
            return ValueClass.Undefined
        }
        val = this.normalizeValue(val);
        if (val <= 500)
            return ValueClass.Normal
        else if (val <= 2000)
            return ValueClass.Information
        else if (val <= 4000)
            return ValueClass.Warning
        else
            return ValueClass.Error
    }

    private normalizeValue(value: number): number {
        return value * this.factor;
    }

}