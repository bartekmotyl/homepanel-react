import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Switch } from '../devices/interfaces/generic/genericDevices';
import { FaLightbulb } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { WidgetFontCaption, widgetSizeFactor, WidgetFontHeadlineIcon } from './widgetTexts';
import { IconButton } from '@material-ui/core';
import { WidgetProperties, WidgetSize } from './widgets';

export function SwitchWidget({ deviceId, size }: WidgetProperties) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const switchable =  device as Switch | undefined;;
    const state = switchable?.getState() ?? 'N/A';

    const handleClick = () => {
      switchable?.toggle();
    }

    return (
      <TableContainer size={size}>
          <Content>
              <IconButton color="inherit" onClick={handleClick}>
                <WidgetFontHeadlineIcon size={size}>
                  { !state && <FaRegLightbulb/>}
                  { state && <FaLightbulb/>}
                </WidgetFontHeadlineIcon>
              </IconButton>
          </Content> 
          <HeaderRow><WidgetFontCaption size={size}>{device?.getName()}</WidgetFontCaption></HeaderRow>
      </TableContainer>
    );
}
const TableContainer = styled.div<{size: WidgetSize}>`
  background-color: #383C45;
  width: ${props =>  `${widgetSizeFactor(props.size) * (150)}px`};
  height: ${props =>  `${widgetSizeFactor(props.size) * (150)}px`};
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


