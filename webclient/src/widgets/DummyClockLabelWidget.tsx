import React, { useState } from 'react';
import { useInterval } from 'react-use';
import styled from 'styled-components';
import { WidgetProperties } from './widgets';
import Moment from 'react-moment';

export function DummyClockLabelWidget({ props }: WidgetProperties) {
    const [time, setTime] = useState<number>()

    useInterval(
      () => {
        setTime(Date.now())
      }, 500)


    return (
      <Box><Moment date={time} format='HH:mm:ss' /></Box>
    )
}

const Box = styled.div`
  background-color: rgba(76, 76, 76, 0.6);
  color: white;
  position: absolute;
  padding: 0.6rem;
  right: 0;
  bottom: 0;
  font-size: 2rem;
  font-weight: bold;
`


