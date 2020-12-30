import React, { } from 'react';
import { WidgetProperties } from '../widgets';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectDevices } from '../../devices/devicesSlice';
import { Device } from '../../devices/Device';
import { Blinds } from '../../devices/interfaces/generic/genericDevices';
import SVG from 'react-inlinesvg';
import { CgArrowUpR  } from 'react-icons/cg';
import { CgArrowDownR } from 'react-icons/cg';
import { BsBoundingBox } from 'react-icons/bs';


import { IconButton } from '@material-ui/core';
import useLongPress from '../../hooks/useLongpress';
import { useTimeoutFn } from 'react-use';
import { FloorPlanTemperatures, FloorPlanTemperaturesConfig } from './FloorPlanTemperatures';

export interface FloorPlanPoint {
    x: number,
    y: number,
}


export interface FloorPlanTemperature {
    location: FloorPlanPoint,
    deviceId: string,
    converterId?: string,
    classifierId?: string
}

export interface FloorPlanBlinds {
    location: FloorPlanPoint,
    deviceId: string,
    groups: string[],
}


export function FloorPlanWidget({ props }: WidgetProperties) {

    const temperatures: FloorPlanTemperature[] = props.temperatures
    const blinds: FloorPlanBlinds[] = props.blinds 
    //const blinds: FloorPlanBlinds[] = [] 

    const devices = useSelector(selectDevices);

    const getDevice = (id: string): Device | null => {
        return (devices.get(id) as any) as Device;
    }
    /*
    const getBlinds = (index: number): Blinds | null => {
        const id = blinds[index]?.deviceId
        return (devices.get(id) as any) as Blinds;
    }
    */


    const refSVG = React.useRef<SVG>(null)
    const refSVGElement = React.useRef<SVGElement>(null)
    const refContainer = React.useRef<HTMLDivElement>(null)

    const [bcrSvgGroup, setBcrSvgGroup] = React.useState<DOMRect>(new DOMRect());
    const [bcrContainer, setBcrContainer] = React.useState<DOMRect>(new DOMRect());
    const [currentBlindsGroup, setCurrentBlindsGroup] = React.useState<string|null>(null);

    const offsetPoint = (point: FloorPlanPoint) => {
        return {
            x: (bcrSvgGroup.x - bcrContainer.x) + point.x * bcrSvgGroup.width,
            y: (bcrSvgGroup.y - bcrContainer.y) + point.y * bcrSvgGroup.height,
        };
    }


    const getFloorPlanTemperaturesConfig = (): FloorPlanTemperaturesConfig => {
        return {
            temperatures,
            offsetX: bcrSvgGroup.x - bcrContainer.x,
            offsetY: bcrSvgGroup.y - bcrContainer.y,
            referenceWidth: bcrSvgGroup.width,
            referenceHeight: bcrSvgGroup.height,
        }
    }

    const getBlindsLocation = (i: number) => {
        return offsetPoint(blinds[i].location)
    }

    const svgLoaded = () => {
        const svgGroupElement = refSVGElement.current?.getElementsByTagName('g')[0]
        setBcrSvgGroup(svgGroupElement?.getBoundingClientRect()!)
        setBcrContainer(refContainer.current?.getBoundingClientRect()!)
    }

    const clickOnSVG = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        //const svgGroupElement = refSVGElement.current?.getElementsByTagName('g')[0]
        //const svgRect = svgGroupElement?.getBoundingClientRect()!
        //const posX = event.clientX - svgRect.x
        //const posY = event.clientY - svgRect.y
        //alert(`[${(posX / svgRect.width).toFixed(3)}, ${(posY / svgRect.height).toFixed(3)}]`)
    }
    const clearCurrentBlindsGroup = () => {
        setCurrentBlindsGroup(null)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isReadyClearCurrentBlindsGroup, _cancelClearCurrentBlindsGroup, 
        resetTimerClearCurrentBlindsGroup] = useTimeoutFn(clearCurrentBlindsGroup, 5000);


    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const getBlindsIndexFromLongPressEvent = (target: any): number => {
        const blindsBox = target.closest('div[data-blinds-index]')
        const index = parseInt(blindsBox.getAttribute('data-blinds-index'))        
        return index
    }

    const performBlindsAction = (index: number, action: ((blinds: Blinds) => void)) => {
        let devices: string[] = [ blinds[index].deviceId ]
        if (currentBlindsGroup) {
            devices = blinds.filter( b=>b.groups?.includes(currentBlindsGroup)).map(b=>b.deviceId)
        }      
        devices.forEach(deviceId=>{
            const blinds = getDevice(deviceId) as any as Blinds
            if (blinds) {
                action(blinds)
            }
        })
        resetTimerClearCurrentBlindsGroup()
    }


    const moveUp = (ev: any, target: any) => performBlindsAction(getBlindsIndexFromLongPressEvent(target), (blinds) => blinds.up())
    const moveDown = (ev: any, target: any) => performBlindsAction(getBlindsIndexFromLongPressEvent(target), (blinds) => blinds.down())
    const moveStop = (ev: any, target: any) => performBlindsAction(getBlindsIndexFromLongPressEvent(target), (blinds) => blinds.stop())

    const longPressUp = useLongPress(moveUp, moveStop, defaultOptions);
    const longPressDown = useLongPress(moveDown, moveStop, defaultOptions);

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
        <Container ref={refContainer}>
            <StyledSVG onClick={clickOnSVG} ref={refSVG} innerRef={refSVGElement} onLoad={svgLoaded} src={props.src} preserveAspectRatio='xMidYMid meet' />
            <FloorPlanTemperatures {...getFloorPlanTemperaturesConfig()} />
            { blinds && blinds.map((b, index) => {
                return (                
                    <BlindsBox key={`blinds_${b.deviceId}_box`} style={
                        {
                            left: getBlindsLocation(index).x,
                            top: getBlindsLocation(index).y,
                        }
                    } data-blinds-index={index}>
                        <BlindsButton $referenceWidth={bcrSvgGroup.width} color='inherit' {...longPressDown}>
                            <ButtonIconBlinds $referenceWidth={bcrSvgGroup.width} $color={getBlindsButtonColor(index)}><CgArrowDownR/></ButtonIconBlinds>
                        </BlindsButton>                        
                        <BlindsGroupButton $referenceWidth={bcrSvgGroup.width} color='secondary' onClick={(ev) => blindsGroupClick(ev, index)}>
                            <ButtonIconBlindsGroup $referenceWidth={bcrSvgGroup.width}><BsBoundingBox/></ButtonIconBlindsGroup>
                        </BlindsGroupButton>                        
                        <BlindsButton $referenceWidth={bcrSvgGroup.width} color='inherit' {...longPressUp}>
                            <ButtonIconBlinds $referenceWidth={bcrSvgGroup.width} $color={getBlindsButtonColor(index)}><CgArrowUpR/></ButtonIconBlinds>
                        </BlindsButton>                        
                    </BlindsBox>
                )
            })}                
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: relative;  
    text-align: left;
`

const BlindsBox = styled.div`
    position: absolute;
`

const StyledSVG = styled(SVG)`
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
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
