import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import { Temperature } from '../devices/interfaces/generic/genericDevices';
import { WidgetFontHeadline, WidgetFontCaption, WidgetContainerSquare, WidgetContent, WidgetHeaderRow } from './widgetUiCommons';
import { WidgetProperties } from './widgets';

export function TemperatureWidget({ props }: WidgetProperties) {
    const deviceId = props.deviceId;
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const temperature = device as Temperature | undefined;
    const value = temperature?.getTemperature(); 
    const data = value ? value.toFixed(1) : 'N/A';
    return (
      <WidgetContainerSquare>
          <WidgetContent><WidgetFontHeadline>{data}°</WidgetFontHeadline></WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>{device?.getName()}</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerSquare>
    );
}
