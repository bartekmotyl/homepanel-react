import { Device } from '../../devices/Device';
import { CompositeValue } from '../../devices/interfaces/generic/genericDevices';
import { AsTemperature } from '../genericConverters';
import { RegistryElement } from '../RegistryElement';

export class CompositeValueAsTemperatureConverter implements RegistryElement, AsTemperature {
    private property : string;
    private id : string;

    constructor(id:string, property: string  = "temperature") {
        this.id = id;
        this.property = property;
    }

    getId(): string {
        return this.id;
    }

    getTemperature(device: Device): number | null {
        let value = (device as any as CompositeValue).getValue(this.property);
        return value || null;
    }
}