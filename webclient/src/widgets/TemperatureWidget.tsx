import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import { Temperature } from '../devices/interfaces/generic/genericDevices';
import styled from 'styled-components';
import { WidgetFontHeadline, WidgetFontCaption, widgetSizeFactor } from './widgetTexts';
import { WidgetProperties, WidgetSize } from './widgets';

export function TemperatureWidget({ deviceId, size }: WidgetProperties) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const temperature = device as Temperature | undefined;
    const value = temperature?.getTemperature(); 
    const data = value ? value.toFixed(1) : 'N/A';
    return (
      <TableContainer size={size}>
          <Content><WidgetFontHeadline size={size}>{data}°</WidgetFontHeadline></Content> 
          <HeaderRow><WidgetFontCaption size={size}>{device?.getName()}</WidgetFontCaption></HeaderRow>
      </TableContainer>
    );
}
const TableContainer = styled.div<{size: WidgetSize}>`
  background-color: #383C45;
  width: ${props =>  `${widgetSizeFactor(props.size) * 150}px`};
  height: ${props =>  `${widgetSizeFactor(props.size) * 150}px`};
  color: white;
  display: grid;
  grid-template-columns: auto;  
  grid-template-rows: ${props =>  `${widgetSizeFactor(props.size) * 50}px`} [line1] auto;
  grid-gap: ${props =>  `${widgetSizeFactor(props.size) * 10}px`};
`;

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

