import { ValueClassifier } from './ValueClassifier';
import { RegistryElement } from '../RegistryElement';

export class PowerMeterValueClassifier implements ValueClassifier, RegistryElement {
    id : string
    factor: number

    constructor(id:string, factor: number) {
        this.id = id;
		// 1 minute -> 60.0 
		// 60 minutes -> 1.0
        this.factor = factor;
    }   
    
    getId(): string {
        return this.id;
    }

    color(value: string): string {
        let val = Number(value);
        if (!val) {
            return "#e0b300"; 
        }
        
        val = this.normalizeValue(val);

		if (val <= 500)
			return "#29746d";		
		else if (val <= 2000)
			return "#609121";		
		else 
            return "#e0b300";	
    }
	
	private normalizeValue(value: number): number {
		return value * this.factor;
    }
        
}