import React, { useState } from 'react';
import { WidgetProperties } from './widgets';
import styled from 'styled-components';
import {useAsync, useInterval} from 'react-use';
import { useSwipeable } from 'react-swipeable';
//import Image from 'material-ui-image'

export function GalleryWidget({ props }: WidgetProperties) {
  const [hash, setHash] = useState(Date.now())
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(0)

  const state = useAsync(async () => {
      const origUrl: string = props.src
      const url = origUrl.replace("/0", `/${selectedGroup}`)
      setIsLoading(true)
      const response = await fetch(url);
      const result = await response.json();
      setIsLoading(false)
      return result
  }, [hash, selectedGroup]);
    
  const handleClick = () => {
    setHash(Date.now())
  }    

  const groupCount = 2
  const handlers = useSwipeable({
    onSwipedLeft: (_eventData) => {
      setSelectedGroup((selectedGroup + 1) % groupCount)
    },
    onSwipedRight: (_eventData) => { 
      setSelectedGroup((selectedGroup + groupCount - 1) % groupCount)
    },
})
  
  const ms = props.ms || 10 * 60 * 1000;
  useInterval(handleClick, ms)

  return (
    <StyledImageContainer {...handlers} >
      <Box>{state.value?.exifDate ?? ''}</Box>
      <StyledImage src={`data:image/jpeg;base64, ${state.value?.data ?? ''}`} alt='' onClick={handleClick} isLoading={isLoading}/>
    </StyledImageContainer>
  )
}

const StyledImageContainer = styled.div`
  width: 100%;
  height: 100%;
`
const StyledImage = styled.img<{isLoading: boolean}>`
  width: auto;
  height: auto;
  max-width:100%;
  max-height:100%;
  object-fit: cover;
  opacity: ${props =>  `${props.isLoading ? "30%" : "100%"}`};
`

const Box = styled.div`
  background-color: rgba(76, 76, 76, 0.6);
  color: white;
  position: absolute;
  padding: 0.6rem;
  left: 100;
  top: 100;
  font-size: 1rem;
  font-weight: bold;
`