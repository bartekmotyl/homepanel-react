import React from 'react'
import { selectDevices } from '../devices/devicesSlice'
import { useSelector } from 'react-redux'
import { Temperature } from '../devices/interfaces/generic/genericDevices'
import { WidgetFontHeadline, WidgetFontCaption, WidgetContainerSquare, WidgetContent, WidgetHeaderRow } from './widgetUiCommons'
import { WidgetProperties } from './widgets'
import { asInterface } from '../utils/cast'

export function TemperatureWidget({ props }: WidgetProperties) {
    const deviceId = props.deviceId
    const devices = useSelector(selectDevices)
    const device = devices.get(deviceId)
    const temperature = asInterface<Temperature>(deviceId, device)
    const value = temperature?.getTemperature()
    const data = value && typeof value === 'number' ? value.toFixed(1) : 'N/A'
    const title = props.title ?? device?.getName()

    return (
      <WidgetContainerSquare>
          <WidgetContent><WidgetFontHeadline>{data}°</WidgetFontHeadline></WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>{title}</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerSquare>
    )
}
