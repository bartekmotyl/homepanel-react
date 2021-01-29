import React from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { WidgetContainerSquare, WidgetContent, WidgetFontCaption, WidgetFontHeadlineIcon, WidgetHeaderRow } from './widgetUiCommons';
import { IconButton } from '@material-ui/core';
import { WidgetProperties  } from './widgets';

export function ReloadWidget({ props }: WidgetProperties) {

    const handleClick = () => {
      window.location.reload()
    }

    return (
      <WidgetContainerSquare>
          <WidgetContent>
              <IconButton color="inherit" onClick={handleClick}>
                <WidgetFontHeadlineIcon>
                  <AiOutlineReload/>
                </WidgetFontHeadlineIcon>
              </IconButton>
          </WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>Reload</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerSquare>
    );
}



