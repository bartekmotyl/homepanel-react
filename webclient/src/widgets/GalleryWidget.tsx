import React, { useState } from 'react'
import { WidgetProperties } from './widgets'
import styled from 'styled-components'
import {useAsync, useInterval} from 'react-use'
import { useSwipeable } from 'react-swipeable'
import { DateTime } from 'luxon'
import { random } from 'lodash'

type PhotoGroupMeta = {
  name: string
  photosCount: number
}

type PhotoData = {
  data: Buffer | string
  contentType: string
  fileName: string
  ctime: Date
  mtime: Date
  exifDate: string
}

export function GalleryWidget({ props }: WidgetProperties) {
  const [hash, setHash] = useState(Date.now())

  const [isLoading, setIsLoading] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [groups, setGroups] = useState<PhotoGroupMeta[]>([])

  const [currentPhoto, setCurrentPhoto] = useState<PhotoData | undefined>()
  const [currentGroupName, setCurrentGroupName] = useState<string | undefined>()

  useAsync(async () => {
    const url = `${props.src}/photos/groups`
    const response = await fetch(url)
    const result = await response.json() as PhotoGroupMeta[]
    setGroups(result)
  }, []);

 

  useAsync(async () => {
      // we assume here 
      console.log(`selectedGroup: ${selectedGroup}`)
      let idx = selectedGroup - 1
      let auto = false
      if (idx === -1) {
        idx = random(groups.length-1)
        auto = true
      } 
      const url = `${props.src}/photos/random/json/${idx}`
      setIsLoading(true)
      const response = await fetch(url)
      const result = await response.json() as PhotoData
      setCurrentPhoto(result)
      setCurrentGroupName(auto ? `${groups[idx].name} (*)` : `${groups[idx].name}`)
      setIsLoading(false)
  }, [groups, hash, selectedGroup]);
    
  const handleDoubleClick: React.MouseEventHandler<HTMLImageElement> = (event) => {
    setHash(Date.now())
  }    

  const exifDate = () => {
    if (!currentPhoto?.exifDate) {
      return ''
    }
    const date = DateTime.fromFormat(currentPhoto?.exifDate, "yyyy:MM:dd HH:mm:ss")
    return date.toFormat("yyyy/MM/dd")
  }
  const handlers = useSwipeable({
    onTap: (_eventData) => {
      setHash(Date.now())
    },
    onSwipedLeft: (_eventData) => {
      if (groups.length > 0) {
        setSelectedGroup((selectedGroup + (groups.length + 1) - 1) % (groups.length + 1))
      }
    },
    onSwipedRight: (_eventData) => { 
      if (groups.length > 0) {
        setSelectedGroup((selectedGroup + 1) % (groups.length + 1))
      }
    },
})
  
  const ms = props.ms || 10 * 60 * 1000;
  useInterval(handleDoubleClick, ms)

  return (
    <StyledImageContainer {...handlers} >
      <BoxGroup>{currentGroupName ?? ''}</BoxGroup>
      <BoxDate>{exifDate()}</BoxDate>
      <StyledImage src={`data:image/jpeg;base64, ${currentPhoto?.data ?? ''}`} alt='' onDoubleClick={handleDoubleClick} isLoading={isLoading}/>
    </StyledImageContainer>
  )
}

const StyledImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const StyledImage = styled.img<{isLoading: boolean}>`
  width: auto;
  height: auto;
  max-width:100%;
  max-height:100%;
  object-fit: cover;
  opacity: ${props =>  `${props.isLoading ? "30%" : "100%"}`};
`

const BoxDate = styled.div`
  background-color: rgba(76, 76, 76, 0.6);
  color: white;
  position: absolute;
  padding: 0.6rem;
  left: 0;
  top: 0;
  font-size: 1rem;
  font-weight: bold;
`

const BoxGroup = styled.div`
  background-color: rgba(76, 76, 76, 0.6);
  color: white;
  position: absolute;
  padding: 0.6rem;
  right: 0;
  top: 0;
  font-size: 1rem;
  font-weight: bold;
`