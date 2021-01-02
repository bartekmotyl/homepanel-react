import React from 'react';
import { WidgetProperties  } from './widgets';
import Iframe from 'react-iframe'

export function IframeWidget({ props }: WidgetProperties) {
    return (
        <>
            <Iframe url={props.url} width='100%' height='100%' />
        </>
    )
}



