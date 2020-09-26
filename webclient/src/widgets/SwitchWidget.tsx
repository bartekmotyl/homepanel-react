import React from 'react';
import { selectDevices } from '../devices/devicesSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Switch } from '../devices/interfaces/generic/genericDevices';

interface Props {
    deviceId: string;
}

export function SwitchWidget({ deviceId }: Props) {
    const devices = useSelector(selectDevices);
    const device = devices.get(deviceId);
    const switchable =  device as Switch | undefined;;
    const state = switchable?.getState() ?? 'N/A';

    return (
        <TableContainer>
            <Content><FontAwesomeIcon icon={faLightbulb}/> {state}</Content> 
            <HeaderRow>{device?.getName()}</HeaderRow>
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
  font-size: 2vmin;
  color: #A5A9B2;
`;

const Content = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
  place-self: center;
  font-size: 6vmin;
`;

