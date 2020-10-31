import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Blinds } from '../devices/interfaces/generic/genericDevices';
import { CgArrowUpR } from 'react-icons/cg';
import { CgArrowDownR } from 'react-icons/cg';
import { IconButton } from '@material-ui/core';
import useLongPress from '../hooks/useLongpress';
import { WidgetProperties } from './widgets';
import { WidgetContainerRect, WidgetFontCaption, WidgetFontHeadlineIcon } from './widgetCommons';

export function BlindsWidget({ deviceId }: WidgetProperties) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const blinds =  device as Blinds | undefined;;

    const handleClick = () => {
    }
    const defaultOptions = {
      shouldPreventDefault: true,
      delay: 500,
    };

    const moveUp = () => blinds?.up();
    const moveDown = () => blinds?.down();
    const moveStop = () => blinds?.stop();

    const longPressUp = useLongPress(moveUp, moveStop, defaultOptions);
    const longPressDown = useLongPress(moveDown, moveStop, defaultOptions);

    return (
      <WidgetContainerRect onClick={handleClick}>
          <Content>
              <StyledIconButton color="inherit" {...longPressDown}>
                <WidgetFontHeadlineIcon>
                  <CgArrowDownR/>
                </WidgetFontHeadlineIcon>
              </StyledIconButton>
              <StyledIconButton color="inherit" {...longPressUp}>
                <WidgetFontHeadlineIcon>
                  <CgArrowUpR/>
                </WidgetFontHeadlineIcon>
              </StyledIconButton>
          </Content> 
          <HeaderRow><WidgetFontCaption>{device?.getName()}</WidgetFontCaption></HeaderRow>
      </WidgetContainerRect>
    );
}



const StyledIconButton = styled(IconButton)`
  vertical-align: middle;
  .mat-icon {
     vertical-align: middle;
  }
`;


const HeaderRow = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  color: #A5A9B2;
`;

const Content = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
  vertical-align: middle;
  place-self: center;
`;


