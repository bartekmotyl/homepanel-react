import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Blinds } from '../devices/interfaces/generic/genericDevices';
import { CgArrowUpR } from 'react-icons/cg';
import { CgArrowDownR } from 'react-icons/cg';
import { WidgetFontCaption, widgetSizeFactor, WidgetFontHeadlineIcon } from './widgetTexts';
import { IconButton } from '@material-ui/core';
import useLongPress from '../hooks/useLongpress';
import { WidgetProperties, WidgetSize } from './widgets';

export function BlindsWidget({ deviceId, size }: WidgetProperties) {
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
      <TableContainer onClick={handleClick} size={size}>
          <Content>
              <StyledIconButton color="inherit" {...longPressDown}>
                <WidgetFontHeadlineIcon size={size}>
                  <CgArrowDownR/>
                </WidgetFontHeadlineIcon>
              </StyledIconButton>
              <StyledIconButton color="inherit" {...longPressUp}>
                <WidgetFontHeadlineIcon size={size}>
                  <CgArrowUpR/>
                </WidgetFontHeadlineIcon>
              </StyledIconButton>
          </Content> 
          <HeaderRow><WidgetFontCaption size={size}>{device?.getName()}</WidgetFontCaption></HeaderRow>
      </TableContainer>
    );
}

const StyledIconButton = styled(IconButton)`
  vertical-align: middle;
  .mat-icon {
     vertical-align: middle;
  }
`;

const TableContainer = styled.div<{size: WidgetSize}>`
  background-color: #383C45;
  width: ${props =>  `${widgetSizeFactor(props.size) * (200)}px`};
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
  vertical-align: middle;
  place-self: center;
`;


