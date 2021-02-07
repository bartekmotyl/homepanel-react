import { getStandardValue, ValueClass, ValueClassifier } from './ValueClassifier';

interface RangeData {
    value: number
    color: string
}

export class NumberRangeValueClassifier extends ValueClassifier {
    
    private ranges: RangeData[]

    constructor(deviceClass: string, deviceId: string, ranges: RangeData[]) {
        super(deviceClass, deviceId)
        this.ranges = ranges
    }

    public classify(value: string): string | ValueClass {
        console.log(`NumberRangeValueClassifier`, value, this.ranges)
        let val = Number(value);
        if (value === undefined || value === null || isNaN(val)) {
            return ValueClass.Undefined
        }        
        for (const range of this.ranges) {
            if (range.value === null || val < range.value) {
                return getStandardValue(range.color) ?? range.color
            }
        }
        return ValueClass.Undefined
    }
}