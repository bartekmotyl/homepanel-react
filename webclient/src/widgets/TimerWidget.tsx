import React from 'react';
import { WidgetFontHeadline, WidgetFontCaption, WidgetContainerSquare, WidgetContent, WidgetHeaderRow } from './widgetUiCommons';
import { WidgetProperties } from './widgets';
import { DateTime, Duration } from 'luxon'
import { useAudio, useInterval } from 'react-use';
import useLongPress from "../hooks/useLongpress";

export function TimerWidget({ props }: WidgetProperties) {
    const [timeoutAt, setTimeoutAt] = React.useState<DateTime | null>(null);
    const [currentDuration, setCurrentDuration] = React.useState<Duration | null>(null);
    const [lastDingAt, setLastDingAt] = React.useState<DateTime>(DateTime.fromMillis(0));

    const defaultDuration: Duration = Duration.fromISO(props.duration) 

    const isOvertime = () => {
        return currentDuration && currentDuration.as('seconds') < 0
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [audio, state, controls, ref] = useAudio({
        src: 'ding1.ogg',
        autoPlay: false,
    })

    const tick = () => {
        if (timeoutAt) {
            const now = DateTime.local()
            setCurrentDuration(timeoutAt.diff(now))

            if (isOvertime() && DateTime.local().diff(lastDingAt).as('second') > 10) {
                setLastDingAt(DateTime.local())
                controls.play()
            }
        } else if (currentDuration) {
            setCurrentDuration(null)
        }


    }

    useInterval(tick, 500)    



    const getText = (): string => {
        let duration = currentDuration ?? defaultDuration
        if (isOvertime()) {
            duration = duration.negate()
        }
        return duration.toFormat('mm:ss')
    } 

    const getColor = (): string => {
        if (!setTimeoutAt || !currentDuration) {
            return 'gray'
        }
        
        if (isOvertime()) {
            return 'red'
        }

        return 'yellow'
    }

    const reset = () => {
        setTimeoutAt(null)
        tick()        
    }

    const clicked = () => {
        if (!timeoutAt) {
            setTimeoutAt(DateTime.local().plus(defaultDuration))
            tick()
        } 

        if (isOvertime()) {
            reset()
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

