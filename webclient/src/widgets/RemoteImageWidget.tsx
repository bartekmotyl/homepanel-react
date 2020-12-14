import React, { useState } from 'react';
import { WidgetProperties } from './widgets';
import styled from 'styled-components';
import {useInterval} from 'react-use';

export function RemoteImageWidget({ props }: WidgetProperties) {
    const [hash, setHash] = useState(Date.now())
    const ms = props.timeout || 5 * 60 * 1000
    const handleClick = () => {
      setHash(Date.now())
    }    
    useInterval(handleClick, ms)
    return (
        <StyledImage src={`${props.src}?${hash}`} alt='' onClick={handleClick}/>
    )
}


const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  max-width:100%;
  max-height:100%;  
`