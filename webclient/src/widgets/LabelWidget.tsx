import React, { useState } from 'react';
import { useInterval } from 'react-use';
import styled from 'styled-components';
import { WidgetProperties } from './widgets';
import {useSelector} from "react-redux";
import {selectDevices} from "../devices/devicesSlice";

export function LabelWidget({ props }: WidgetProperties) {
    const deviceId = props.deviceId;
    const style = props.style;
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const value =  'N/A';
    const title = props.title ?? device?.getName()



    return (
      <Box>{title}: {value}</Box>
    )
}

const Box = styled.div`
  //background-color: rgba(76, 76, 76, 0.6);
  color: #A5A9B2;
  padding: 0.6rem;
  right: 0;
  bottom: 0;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
`


