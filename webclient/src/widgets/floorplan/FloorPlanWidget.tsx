import React, { } from 'react';
import { WidgetProperties } from '../widgets';
import styled from 'styled-components';
import { ValueClassifier } from '../../registry/classifiers/ValueClassifier';
import { useSelector } from 'react-redux';
import { selectDevices } from '../../devices/devicesSlice';
import { Device } from '../../devices/Device';
import { AsTemperature } from '../../registry/genericConverters';
import { Blinds, Temperature } from '../../devices/interfaces/generic/genericDevices';
import SVG from 'react-inlinesvg';
import { CgArrowUpR  } from 'react-icons/cg';
import { CgArrowDownR } from 'react-icons/cg';
import { BsBoundingBox } from 'react-icons/bs';


import { IconButton } from '@material-ui/core';
import useLongPress from '../../hooks/useLongpress';
import { useTimeoutFn } from 'react-use';

interface Point {
    x: number,
    y: number,
}


interface FloorPlanTemperature {
    location: Point,
    deviceId: string,
    converterId?: string,
    classifierId?: string
}

interface FloorPlanBlinds {
    location: Point,
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
    const getTemperatureValue = (temp: FloorPlanTemperature) => {
        const device = getDevice(temp.deviceId)!
        const converter = temp.converterId ? getDevice(temp.converterId) as any as AsTemperature : undefined

        if (converter) {
            return converter.getTemperature(device)
        } else {
            const tempDevice = device as any as Temperature
            if (tempDevice.getTemperature === undefined) {
                debugger
            }
            return tempDevice.getTemperature()
        }
    }

    const getTemperatureValueText = (temp: FloorPlanTemperature) => {
        const value = getTemperatureValue(temp)
        return value ? value.toFixed(1) + "&deg;" : ""
    }

    const getTemperatureColor = (temp: FloorPlanTemperature) => {
        const value = getTemperatureValue(temp)
        const classifier = temp.classifierId ? getDevice(temp.classifierId) as ValueClassifier : undefined
        let color = "gray"
        if (value && classifier) {
            color = classifier.classify(value.toFixed())!;
        }
        return color || "#98a7b9";
    }
    const refSVG = React.useRef<SVG>(null)
    const refSVGElement = React.useRef<SVGElement>(null)
    const refContainer = React.useRef<HTMLDivElement>(null)

    const [bcrSvgGroup, setBcrSvgGroup] = React.useState<DOMRect>(new DOMRect());
    const [bcrContainer, setBcrContainer] = React.useState<DOMRect>(new DOMRect());
    const [currentBlindsGroup, setCurrentBlindsGroup] = React.useState<string|null>(null);

    const offsetPoint = (point: Point) => {
        return {
            x: (bcrSvgGroup.x - bcrContainer.x) + point.x * bcrSvgGroup.width,
            y: (bcrSvgGroup.y - bcrContainer.y) + point.y * bcrSvgGroup.height,
        };
    }

    const getTemperatureLocation = (i: number) => {
        return offsetPoint(temperatures[i].location)
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
                return 'gray'
            }
        }
        return 'white'
    } 

    return (
        <Container ref={refContainer}>
            <StyledSVG onClick={clickOnSVG} ref={refSVG} innerRef={refSVGElement} onLoad={svgLoaded} src={props.src} preserveAspectRatio='xMidYMid meet' />
            { temperatures && temperatures.map((temp, index) => {
                return (
                    <TemperatureBox key={`temp_${temp.deviceId}_box`} style={
                        {
                            left: getTemperatureLocation(index).x,
                            top: getTemperatureLocation(index).y,
                            width: 0.05 * bcrSvgGroup.width ?? 0,
                            height: 0.05 * bcrSvgGroup.height ?? 0,
                        }
                    }>
                        <TemperatureIconInner src="svg/small/073-temperature-inner.svg" color={getTemperatureColor(temp)} />
                        <TemperatureIconOutline src="svg/small/073-temperature-1.svg" />
                        <TemperatureIconTitle $referenceWidth={bcrSvgGroup.width} dangerouslySetInnerHTML={{ __html: getTemperatureValueText(temp) }} />
                    </TemperatureBox>
                )
            })}
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


const TemperatureBox = styled.div`
    position: absolute;
    //width: 5%;
    //height: 5%;
    //background-color: rgba(128, 128, 128, .25)
`
const BlindsBox = styled.div`
    position: absolute;
`

const TemperatureIconOutline = styled(SVG)`
    position: absolute;
    top: 0;
    left: 0;
    & path {
        fill: "#98a7b9"; 
    }
`
const TemperatureIconInner = styled(SVG) <{ color: string }>`
    position: absolute;
    top: 0;
    left: 0;
    & path {
        fill: ${props => `${props.color}`};
    }
`
const TemperatureIconTitle = styled.div<{ $referenceWidth: number }>`
    position: absolute;
    top: calc(100% );
    text-align: center;
    color: white;
    font-size: ${props =>  `${props.$referenceWidth * 0.025}px`};
    width: 100%;
    //height: 100%;
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
