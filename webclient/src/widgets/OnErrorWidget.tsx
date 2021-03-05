import React from 'react'
import { WidgetContainerSquare, WidgetContent, WidgetFontCaption, WidgetHeaderRow } from './widgetUiCommons'

export function OnErrorWidget() {
    return (
      <WidgetContainerSquare>
          <WidgetContent>
            Error
          </WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>Error</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerSquare>
    )
}



