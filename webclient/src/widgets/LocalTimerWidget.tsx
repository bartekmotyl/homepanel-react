import React from 'react';
import { WidgetFontHeadline, WidgetFontCaption, WidgetContainerSquare, WidgetContent, WidgetHeaderRow } from './widgetUiCommons';
import { WidgetProperties } from './widgets';
import { useAudio } from 'react-use';
import useLongPress from "../hooks/useLongpress";
import { useSelector } from 'react-redux';
import { selectDevices } from '../devices/devicesSlice';
import { TimerDevice } from '../devices/implementations/generic/TimerDevice';

export function LocalTimerWidget({ props }: WidgetProperties) {
    
    const devices = useSelector(selectDevices)
    const timer = (devices.get(props.deviceId) as any) as TimerDevice;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [audio, state, controls, ref] = useAudio({
        src: 'ding1.ogg',
        autoPlay: false,
    })

    const getText = (): string => {
        const duration  = timer.getDisplayDuration()
        return duration.toFormat('mm:ss', { floor: true})
    } 

    const getColor = (): string => {
        if (!timer.isRunning()) {
            return 'gray'
        }
        
        if (timer.isTimeout()) {
            return 'red'
        }

        return 'yellow'
    }

    const reset = () => {
        timer.stop()  
    }

    const clicked = () => {
        if (!timer.isRunning()) {
            timer.start()
        } else if (timer.isTimeout()) {
            timer.stop()
        }
    }

    const clickedLongPress = () => {
        reset()
    } 

    const defaultOptionsLongPress = {
        shouldPreventDefault: true,
        delay: 500,
    }

    const longPress = useLongPress(clickedLongPress, clicked, defaultOptionsLongPress)
       
  

    return (
      <WidgetContainerSquare {...longPress}>
          <WidgetContent><WidgetFontHeadline style={{color: getColor()}}>{getText()}</WidgetFontHeadline></WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>{props.title}</WidgetFontCaption></WidgetHeaderRow>
          {audio}
      </WidgetContainerSquare>
    );
}

