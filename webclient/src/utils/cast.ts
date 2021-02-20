import { Device } from "../devices/Device"

export const asInterface = <T>(id: string, dev?: Device) => {
    if (!dev) {
        console.error(`Undefined device: ${id}`)
        throw Error(`Undefined device: ${id}`)
    }
    // TODO: add some kind of dynamic check whether device actually 
    // offer requested capability 
    return dev as any as T
}  
