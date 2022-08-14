import React, { useState } from 'react';
import { useInterval } from 'react-use';
import styled from 'styled-components';
import { WidgetProperties } from './widgets';
import { DateTime } from 'luxon';

export function DummyClockLabelWidget({ props }: WidgetProperties) {
    const [time, setTime] = useState<string>('ddd')

    useInterval(
      () => {
        const timeStr = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
        console.log(timeStr)
        setTime(timeStr)
      }, 500)

    return (
      <Box>{time}</Box>
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


