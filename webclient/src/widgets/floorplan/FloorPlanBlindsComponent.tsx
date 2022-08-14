import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Device } from "../../devices/Device";
import { selectDevices } from "../../devices/devicesSlice";
import { FloorPlanBlinds, FloorPlanPoint } from "./FloorPlanWidget";
import { Blinds } from "../../devices/interfaces/generic/genericDevices";
import { IconButton } from '@mui/material';
import useLongPress from "../../hooks/useLongpress";
import { useTimeoutFn } from "react-use";
import { CgArrowDownR, CgArrowUpR } from "react-icons/cg";
import { BsBoundingBox } from "react-icons/bs";
import { asInterface } from "../../utils/cast";

export interface FloorPlanBlindsConfig {
    blinds: FloorPlanBlinds[]
    offsetX: number,
    offsetY: number,
    referenceWidth: number,
    referenceHeight: number,
}

export const FloorPlanBlindsComponent : React.FunctionComponent<FloorPlanBlindsConfig> = props => {
    const blinds = props.blinds
    const [currentBlindsGroup, setCurrentBlindsGroup] = React.useState<string|null>(null);    

    const offsetPoint = (point: FloorPlanPoint) => {
        return {
            x: props.offsetX + point.x * props.referenceWidth,
            y: props.offsetY + point.y * props.referenceHeight,
        };
    }
    const getBlindsLocation = (i: number) => {
        return offsetPoint(blinds[i].location)
    }

    const devices = useSelector(selectDevices);

    const getDevice = (id: string): Device | undefined => {
        return devices.get(id)
    }    

    const getBlindsIndexFromLongPressEvent = (target: any): number => {
        const blindsBox = target.closest('div[data-blinds-index]')
        const index = parseInt(blindsBox.getAttribute('data-blinds-index'))        
        return index
    }

    const clearCurrentBlindsGroup = () => {
        setCurrentBlindsGroup(null)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isReadyClearCurrentBlindsGroup, _cancelClearCurrentBlindsGroup, 
        resetTimerClearCurrentBlindsGroup] = useTimeoutFn(clearCurrentBlindsGroup, 5000);
            
    const performBlindsAction = (index: number, action: ((blinds: Blinds) => void)) => {
        let devices: string[] = [ blinds[index].deviceId ]
        if (currentBlindsGroup) {
            devices = blinds.filter( b=>b.groups?.includes(currentBlindsGroup)).map(b=>b.deviceId)
        }      
        devices.forEach(deviceId=>{
            const blinds = asInterface<Blinds>(deviceId, getDevice(deviceId))
            if (blinds) {
                action(blinds)
            }
        })
        resetTimerClearCurrentBlindsGroup()
    }


    const moveUp = (ev: any, target: any) => performBlindsAction(getBlindsIndexFromLongPressEvent(target), (blinds) => blinds.up())
    const moveDown = (ev: any, target: any) => performBlindsAction(getBlindsIndexFromLongPressEvent(target), (blinds) => blinds.down())
    const moveStop = (ev: any, target: any) => performBlindsAction(getBlindsIndexFromLongPressEvent(target), (blinds) => blinds.stop())

    const defaultOptionsLongPress = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const longPressUp = useLongPress(moveUp, moveStop, defaultOptionsLongPress);
    const longPressDown = useLongPress(moveDown, moveStop, defaultOptionsLongPress);

    const blindsGroupClick = (event: any, index: number) => {
        //console.log(`blindsGroupClick: ${index}`)
        let groupIndex = -1
        const groups = blinds[index].groups
        if (currentBlindsGroup) {
            groupIndex = groups.indexOf(currentBlindsGroup) // -1 returned when not found is ok
        }
        let newGroup: string | null = null
        let newGroupIndex: number|null = groupIndex + 1
        if (newGroupIndex < groups.length) {
            newGroup  = groups[newGroupIndex]
        } 
        setCurrentBlindsGroup(newGroup)
        //console.log(`newGroupIndex: ${newGroup}`)
        resetTimerClearCurrentBlindsGroup()
    }

    const getBlindsButtonColor = (index: number) => {
        const groups = blinds[index].groups
        if (currentBlindsGroup) {
            if (groups.includes(currentBlindsGroup)) {
                return '#AEDC84'
            } else {
                return '#707b7c'
            }
        }
        return 'white'
    } 
  

    return (
        <>
            { blinds && blinds.map((b, index) => {
                return (                
                    <BlindsBox key={`blinds_${b.deviceId}_box`} style={
                        {
                            left: getBlindsLocation(index).x,
                            top: getBlindsLocation(index).y,
                        }
                    } data-blinds-index={index}>
                        <BlindsButton $referenceWidth={props.referenceWidth} color='inherit' {...longPressDown}>
                            <ButtonIconBlinds $referenceWidth={props.referenceWidth} $color={getBlindsButtonColor(index)}>
                                <CgArrowDownR/>
                            </ButtonIconBlinds>
                        </BlindsButton>                        
                        <BlindsGroupButton $referenceWidth={props.referenceWidth} color='secondary' onClick={(ev) => blindsGroupClick(ev, index)}>
                            <ButtonIconBlindsGroup $referenceWidth={props.referenceWidth}>
                                <BsBoundingBox/>
                            </ButtonIconBlindsGroup>
                        </BlindsGroupButton>                        
                        <BlindsButton $referenceWidth={props.referenceWidth} color='inherit' {...longPressUp}>
                            <ButtonIconBlinds $referenceWidth={props.referenceWidth} $color={getBlindsButtonColor(index)}>
                                <CgArrowUpR/>
                            </ButtonIconBlinds>
                        </BlindsButton>                        
                    </BlindsBox>
                )
            })}  
        </>
    )
}
const BlindsBox = styled.div`
    position: absolute;
`

const ButtonIconBlinds = styled.span<{ $referenceWidth: number, $color: string }>`
    font-size: ${props =>  `${props.$referenceWidth * 0.05}px`};
    color:  ${props =>  `${props.$color}`};
`

const ButtonIconBlindsGroup = styled.span<{ $referenceWidth: number }>`
    font-size: ${props =>  `${props.$referenceWidth * 0.03}px`};
    color:  #85929e ;
`

const BlindsButton = styled(IconButton)<{ $referenceWidth: number }>`
    && {
        padding:  ${props =>  `${props.$referenceWidth * 0.005}px`};
    }
`
const BlindsGroupButton = styled(IconButton)<{ $referenceWidth: number }>`
    && {
        padding: ${props =>  `${props.$referenceWidth * 0.005}px`};
    }
`
