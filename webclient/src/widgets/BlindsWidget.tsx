import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Blinds } from '../devices/interfaces/generic/genericDevices';
import { CgArrowUpR } from 'react-icons/cg';
import { CgArrowDownR } from 'react-icons/cg';
import { WidgetFontHeadline, WidgetFontCaption, WidgetSize, widgetSizeFactor } from './widgetTexts';
import { IconButton } from '@material-ui/core';
import useLongPress from '../hooks/useLongpress';


interface Props {
    deviceId: string;
    size: WidgetSize,
}

export function BlindsWidget({ deviceId, size }: Props) {
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
            <IconButton color="inherit" {...longPressDown}>
                <WidgetFontHeadline size={size}>
                  <CgArrowDownR/>
                </WidgetFontHeadline>
              </IconButton>
              <IconButton color="inherit" {...longPressUp}>
                <WidgetFontHeadline size={size}>
                  <CgArrowUpR/>
                </WidgetFontHeadline>
              </IconButton>
          </Content> 
          <HeaderRow><WidgetFontCaption size={size}>{device?.getName()}</WidgetFontCaption></HeaderRow>
      </TableContainer>
    );
}
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
  place-self: center;
`;


