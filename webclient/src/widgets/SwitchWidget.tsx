import React from 'react'
import { selectDevices } from '../devices/devicesSlice'
import { useSelector } from 'react-redux'
import { Switch } from '../devices/interfaces/generic/genericDevices'
import { FaLightbulb } from 'react-icons/fa'
import { FaRegLightbulb } from 'react-icons/fa'
import { WidgetContainerSquare, WidgetContent, WidgetFontCaption, WidgetFontHeadlineIcon, WidgetHeaderRow } from './widgetUiCommons'
import { IconButton } from '@material-ui/core'
import { WidgetProperties  } from './widgets'
import { asInterface } from '../utils/cast'

export function SwitchWidget({ props }: WidgetProperties) {
    const deviceId = props.deviceId
    const devices = useSelector(selectDevices)
    const device = devices.get(deviceId)
    const switchable =  asInterface<Switch>(deviceId, device)
    const state = switchable?.getState() ?? 'N/A'
    const title = props.title ?? device?.getName()
    
    const handleClick = () => {
      switchable?.toggle()
    }

    return (
      <WidgetContainerSquare>
          <WidgetContent>
              <IconButton color="inherit" onClick={handleClick}>
                <WidgetFontHeadlineIcon>
                  { !state && <FaRegLightbulb/>}
                  { state && <FaLightbulb/>}
                </WidgetFontHeadlineIcon>
              </IconButton>
          </WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>{title}</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerSquare>
    )
}



