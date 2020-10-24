import { ValueClassifier } from './ValueClassifier';
import { RegistryElement } from '../RegistryElement';

export class IndoorTemperatureValueClassifier implements ValueClassifier, RegistryElement {
    id : string

    constructor(id:string) {
        this.id = id;
    }   
    
    getId(): string {
        return this.id;
    }

    color(value: string): string {
        let val = Number(value);

		if (val < 20.0) {
			return "#0078d7";
		} else if (val <= 21.0) {
			return "#29746d";
		} else if (val <= 22.0) {
			return "#107c10";
		} else if (val <= 23.0) {
            return "#609121"
        } else {
			return "#e0b300";			
        } 
    }
}