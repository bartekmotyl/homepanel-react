import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Switch } from '../devices/interfaces/generic/genericDevices';
import { FaLightbulb } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { WidgetContainerSquare, WidgetFontCaption, WidgetFontHeadlineIcon } from './widgetCommons';
import { IconButton } from '@material-ui/core';
import { WidgetProperties  } from './widgets';

export function SwitchWidget({ deviceId }: WidgetProperties) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const switchable =  device as Switch | undefined;;
    const state = switchable?.getState() ?? 'N/A';

    const handleClick = () => {
      switchable?.toggle();
    }

    return (
      <WidgetContainerSquare>
          <Content>
              <IconButton color="inherit" onClick={handleClick}>
                <WidgetFontHeadlineIcon>
                  { !state && <FaRegLightbulb/>}
                  { state && <FaLightbulb/>}
                </WidgetFontHeadlineIcon>
              </IconButton>
          </Content> 
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


