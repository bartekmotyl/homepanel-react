import React from 'react';
import { WidgetProperties  } from './widgets';
import Iframe from 'react-iframe'
import styled from 'styled-components';

export function IframeWidget({ props }: WidgetProperties) {
    return (
        <>
            <StyledIframe url={props.url} width='100%' height='100%'/>
        </>
    )
}

const StyledIframe = styled(Iframe)`
    border-width: 0px;
`



