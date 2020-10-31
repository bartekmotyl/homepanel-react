import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import { Temperature } from '../devices/interfaces/generic/genericDevices';
import styled from 'styled-components';
import { WidgetFontHeadline, WidgetFontCaption, WidgetContainerSquare } from './widgetCommons';
import { WidgetProperties } from './widgets';

export function TemperatureWidget({ deviceId }: WidgetProperties) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const temperature = device as Temperature | undefined;
    const value = temperature?.getTemperature(); 
    const data = value ? value.toFixed(1) : 'N/A';
    return (
      <WidgetContainerSquare>
          <Content><WidgetFontHeadline>{data}°</WidgetFontHeadline></Content> 
          <HeaderRow><WidgetFontCaption>{device?.getName()}</WidgetFontCaption></HeaderRow>
      </WidgetContainerSquare>
    );
}


const HeaderRow = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  color: #A5A9B2;
`;

const Content = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
  place-self: center;
`;

