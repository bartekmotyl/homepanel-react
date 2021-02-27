import React, { useState } from 'react';
import { useInterval } from 'react-use';
import styled from 'styled-components';
import { WidgetProperties } from './widgets';
import {useSelector} from "react-redux";
import {selectDevices} from "../devices/devicesSlice";
import {TextRepresentation} from "../devices/interfaces/generic/genericDevices";

export function LabelWidget({ props }: WidgetProperties) {
    const deviceId = props.deviceId;
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const textDevice =  device as TextRepresentation | undefined;
    const value =  textDevice?.getStateAsText() ?? 'N/A';
    const title = props.title ?? device?.getName()
    const suffix =  props.suffix ?? ""

    return (
      <Box>{title}: {value}{suffix}</Box>
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


