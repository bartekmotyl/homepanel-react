import React, { useEffect } from 'react';
import { WidgetProperties } from './widgets';
import { useAudio } from 'react-use';
import { useSelector } from 'react-redux';
import { selectDevices } from '../devices/devicesSlice';
import { DateTime } from 'luxon';
import { TimerDevice } from '../devices/implementations/generic/TimerDevice';

export function LocalTimerWidgetSound({ props }: WidgetProperties) {
    
    const devices = useSelector(selectDevices)
    
    const [lastDing, setLastDing] = React.useState<DateTime>(DateTime.fromMillis(0));   

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [audio, state, controls, ref] = useAudio({
        src: 'ding1.ogg',
        autoPlay: false,
    })
  
    const anyTimedOut: boolean = devices.some(dev => (dev instanceof TimerDevice && dev.isTimeout()))

    useEffect(() => {
        if (anyTimedOut && DateTime.local().diff(lastDing).as('seconds') > 10) {
            setLastDing(DateTime.local())
            controls.play()
        }
      }, [anyTimedOut, controls, lastDing])

    return (
        <>
            {audio}
        </>
    );
}

