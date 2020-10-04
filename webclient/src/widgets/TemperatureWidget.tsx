import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import { Temperature } from '../devices/interfaces/generic/genericDevices';
import styled from 'styled-components';
import { WidgetFontHeadline, WidgetFontCaption, WidgetTextSize } from './widgetTexts';

interface Props {
    deviceId: string;
    textSize: WidgetTextSize,
}

export function TemperatureWidget({ deviceId, textSize }: Props) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const temperature = device as Temperature | undefined;
    const value = temperature?.getTemperature(); 
    const data = value ? value.toFixed(1) : 'N/A';
    return (
        <TableContainer>
            <Content><WidgetFontHeadline size={textSize}>{data}°</WidgetFontHeadline></Content> 
            <HeaderRow><WidgetFontCaption size={textSize}>{device?.getName()}</WidgetFontCaption></HeaderRow>
        </TableContainer>
    );
}
const TableContainer = styled.div`
  background-color: #383C45;
  width: 100%;
  height: 100%;
  margin: 0px;
  color: white;

  display: grid;
  grid-template-columns: auto;  
  grid-template-rows: 50px [line1] auto;
  grid-gap: 1rem;
`;

const HeaderRow = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  /*font-size: 1vw;*/
  /*font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300))); */
  color: #A5A9B2;
`;

const Content = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
  place-self: center;
  /*font-size: 3vw;*/
`;

