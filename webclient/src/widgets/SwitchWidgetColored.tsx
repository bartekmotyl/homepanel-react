import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import { Switch } from '../devices/interfaces/generic/genericDevices';
import { FaTint } from 'react-icons/fa';
import { WidgetContainerSquare, WidgetContent, WidgetFontCaption, WidgetFontHeadlineIcon, WidgetHeaderRow } from './widgetUiCommons';
import { IconButton } from '@material-ui/core';
import { WidgetProperties  } from './widgets';
import styled from "styled-components";
import {BrightnessAutoOutlined, HotTubOutlined} from "@material-ui/icons";

export function SwitchWidgetColored({ props }: WidgetProperties) {
    const deviceId = props.deviceId;
    const style = props.style;
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const switchable =  device as Switch | undefined;
    const state = switchable?.getState() ?? 'N/A';
    const title = props.title ?? device?.getName()
    const iconColor = state ? "secondary" : "inherit"

    let icon = null;
    switch (style) {
        case "auto":
            icon = <BrightnessAutoOutlined style={{ fontSize: 56 }}/>;
            break;
        case "heating":
            icon = <HotTubOutlined style={{ fontSize: 56 }}/>;
            break;
        case "filter":
            icon = <WidgetFontHeadlineIcon>
                        <FaTint/>
                   </WidgetFontHeadlineIcon>
            break;
    }



    const handleClick = () => {
      switchable?.toggle();
    }

   return (
        <WidgetContainerSquare>
            <WidgetContent>
                <IconButton color={iconColor} onClick={handleClick}>
                    {icon}
                </IconButton>
            </WidgetContent>
            <WidgetHeaderRow><WidgetFontCaption>{title}</WidgetFontCaption></WidgetHeaderRow>
            {state && <ActiveRow/>}
        </WidgetContainerSquare>
    );
}


const ActiveRow = styled.div`
   
`;

