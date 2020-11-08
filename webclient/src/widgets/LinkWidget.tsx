import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { WidgetContainerSquare, WidgetContent, WidgetFontCaption, WidgetFontHeadlineIcon, WidgetHeaderRow } from './widgetUiCommons';
import { IconButton } from '@material-ui/core';
import { WidgetProperties  } from './widgets';

export function LinkWidget({ props }: WidgetProperties) {
    const href = props.href;
    const text = props.text;
    const handleClick = () => {
      window.location = href
    }
    return (
      <WidgetContainerSquare>
          <WidgetContent>
              <IconButton color="inherit" onClick={handleClick}>
                <WidgetFontHeadlineIcon>
                  <FaExternalLinkAlt/>
                </WidgetFontHeadlineIcon>
              </IconButton>
          </WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>{text}</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerSquare>
    );
}



