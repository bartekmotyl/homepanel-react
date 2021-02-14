import { store } from '../../app/store'
import { MediaMeter, MediaMeterVariant } from '../../devices/interfaces/generic/genericDevices'
import { IndicatorWidgetSource } from './IndicatorWidgetSource'
import { ConnectedDevice } from '../../devices/Device'



export class MediaMeterIndicatorWidgetSource extends IndicatorWidgetSource {
    private refDeviceId: string
    private unitMinute?: string

    constructor(sourceClass: string, sourceId: string, name: string, refDeviceId: string, unitMinute?: string)  {
        super(sourceClass, sourceId, name)
        this.refDeviceId = refDeviceId
        this.unitMinute = unitMinute
    }

    private getRefDevice(): ConnectedDevice {
        return store.getState().devices.map.get(this.refDeviceId)! as ConnectedDevice
    }

    private getMediaMeter(): MediaMeter {
        return this.getRefDevice() as any as MediaMeter   
    }


    public getIcon() : string {
        const mm = this.getMediaMeter()
        switch (mm.getVariant()) {
            case MediaMeterVariant.Power:
                return 'svg/small/014-plug.svg'
            case MediaMeterVariant.Water:
                return 'svg/small/010-water.svg'
            case MediaMeterVariant.Gas:
                return 'svg/small/011-fire-1.svg'
        }
    }

    public getExtraText1() : string {
        const mm = this.getMediaMeter()
        let value =  mm.getTotalValue()
        let val = Number(value);
        if (value === undefined || value === null || isNaN(val)) {
            return "N/A"
        } 

        return value.toFixed()    }

    public getValue(): number | null {
        const mm = this.getMediaMeter()
        let value = mm.getMinuteValue() 
        return value
    }

    private getDefaultUnitMinute(): string {
        switch (this.getMediaMeter().getVariant()) {
            case MediaMeterVariant.Power:
                return 'W'
            case MediaMeterVariant.Water:
                return 'l'
            case MediaMeterVariant.Gas:
                return 'm3'
        }        
    }

    public getName(): string {
        const unit = this.unitMinute ?? this.getDefaultUnitMinute()
        let value = this.getValue() 
        return `${super.getName()}<br/>${value === null ? '?' : value} ${unit}`
    }

    public getIsUpToDate() : boolean { 
        return  this.getRefDevice().isUpToDate()
    }
}
