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
import { IconButton } from '@material-ui/core';
import useLongPress from '../../hooks/useLongpress';

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
    const getBlinds = (index: number): Blinds | null => {
        const id = blinds[index]?.deviceId
        return (devices.get(id) as any) as Blinds;
    }

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
        const svgGroupElement = refSVGElement.current?.getElementsByTagName('g')[0]
        const svgRect = svgGroupElement?.getBoundingClientRect()!
        const posX = event.clientX - svgRect.x
        const posY = event.clientY - svgRect.y
        alert(`[${(posX / svgRect.width).toFixed(3)}, ${(posY / svgRect.height).toFixed(3)}]`)
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const getBlindsIndexFromLongPressEvent = (target: any) => {
        const blindsBox = target.closest('div[data-blinds-index]')
        const index = parseInt(blindsBox.getAttribute('data-blinds-index'))        
        return index
    }

    const moveUp = (ev: any, target: any) => getBlinds(getBlindsIndexFromLongPressEvent(target))?.up();
    const moveDown = (ev: any, target: any) => getBlinds(getBlindsIndexFromLongPressEvent(target))?.down();
    const moveStop = (ev: any, target: any) => getBlinds(getBlindsIndexFromLongPressEvent(target))?.stop()

    const longPressUp = useLongPress(moveUp, moveStop, defaultOptions);
    const longPressDown = useLongPress(moveDown, moveStop, defaultOptions);


    return (
        <Container ref={refContainer}>
            <StyledSVG onClick={clickOnSVG} ref={refSVG} innerRef={refSVGElement} onLoad={svgLoaded} src={props.src} preserveAspectRatio='xMidYMid meet' />
            { temperatures && temperatures.map((temp, index) => {
                return (
                    <TemperatureBox key={`temp_${temp.deviceId}_box`} style={
                        {
                            left: getTemperatureLocation(index).x,
                            top: getTemperatureLocation(index).y,
                        }
                    }>
                        <TemperatureIconInner src="svg/small/073-temperature-inner.svg" color={getTemperatureColor(temp)} />
                        <TemperatureIconOutline src="svg/small/073-temperature-1.svg" />
                        <TemperatureIconTitle dangerouslySetInnerHTML={{ __html: getTemperatureValueText(temp) }} />
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
                        <StyledIconButton color='inherit' {...longPressDown}>
                            <StyledIcon><CgArrowDownR/></StyledIcon>
                        </StyledIconButton>                        
                        <StyledIconButton color='inherit' {...longPressUp}>
                            <StyledIcon><CgArrowUpR/></StyledIcon>
                        </StyledIconButton>                        
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
    width: 4%;
    height: 4%;
    //background-color: rgba(128, 128, 128, .25)
`
const BlindsBox = styled.div`
    position: absolute;
    //width: 100px;
    //height: 100px;
    //background-color: fuchsia;
    color: white;
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
const TemperatureIconTitle = styled.div`
    position: absolute;
    top: 100%;
    text-align: center;
    color: white;
    font-size: 1rem;
    width: 100%;
`


const StyledSVG = styled(SVG)`
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
`

const StyledIcon = styled.span`
    font-size: 2rem;
`

const StyledIconButton = styled(IconButton)`
    vertical-align: middle;
    .mat-icon {
        vertical-align: middle;
    }
    
    && {
        padding: 0.2rem;
    }
  
`
