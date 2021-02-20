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
import { WidgetContainerRect, WidgetContent, WidgetFontCaption, WidgetFontHeadlineIcon, WidgetHeaderRow } from './widgetUiCommons';
import { asInterface } from '../utils/cast';

export function BlindsWidget({ props }: WidgetProperties) {
    const deviceId = props.deviceId;
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const blinds =  asInterface<Blinds>(deviceId, device)

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
    const title = props.title ?? device?.getName()
    return (
      <WidgetContainerRect onClick={handleClick}>
          <WidgetContent>
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
          </WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>{title}</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerRect>
    );
}

const StyledIconButton = styled(IconButton)`
  vertical-align: middle;
  .mat-icon {
     vertical-align: middle;
  }
`;


