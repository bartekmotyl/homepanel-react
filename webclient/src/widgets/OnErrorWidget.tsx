import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { WidgetContainerSquare, WidgetContent, WidgetFontCaption, WidgetHeaderRow } from './widgetUiCommons'

export function ErrorFallbackWidget(props: FallbackProps) {
    return (
      <WidgetContainerSquare>
          <WidgetContent>
            Error
          </WidgetContent> 
          <WidgetHeaderRow><WidgetFontCaption>Error</WidgetFontCaption></WidgetHeaderRow>
      </WidgetContainerSquare>
    )
}



