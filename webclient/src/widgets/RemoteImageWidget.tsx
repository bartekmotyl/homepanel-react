import React, { useState } from 'react';
import { WidgetProperties } from './widgets';
import styled from 'styled-components';
import {useInterval} from 'react-use';
//import Image from 'material-ui-image'

export function RemoteImageWidget({ props }: WidgetProperties) {
    const [hash, setHash] = useState(Date.now())
    const handleClick = () => {
      setHash(Date.now())
    }    
    const ms = props.ms || 10 * 60 * 1000;
    useInterval(handleClick, ms)

    const imgUrl = props.src.includes('?') ? `${props.src}&hash=${hash}` : `${props.src}?hash=${hash}` 

    return (
      <StyledImage src={`${imgUrl}`} alt='' onClick={handleClick} />
    )
}


const StyledImage = styled.img`
  width: auto;
  height: auto;
  max-width:100%;
  max-height:100%;
  object-fit: cover;
`