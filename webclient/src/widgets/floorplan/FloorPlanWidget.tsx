import React, { } from 'react';
import { WidgetProperties } from '../widgets';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { FloorPlanTemperaturesComponent, FloorPlanTemperaturesConfig } from './FloorPlanTemperaturesComponent';
import { FloorPlanBlindsComponent, FloorPlanBlindsConfig } from './FloorPlanBlindsComponent';

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

    const refSVG = React.useRef<SVG>(null)
    const refSVGElement = React.useRef<SVGElement>(null)
    const refContainer = React.useRef<HTMLDivElement>(null)

    const [bcrSvgGroup, setBcrSvgGroup] = React.useState<DOMRect>(new DOMRect());
    const [bcrContainer, setBcrContainer] = React.useState<DOMRect>(new DOMRect());

    const getFloorPlanTemperaturesConfig = (): FloorPlanTemperaturesConfig => {
        return {
            temperatures,
            offsetX: bcrSvgGroup.x - bcrContainer.x,
            offsetY: bcrSvgGroup.y - bcrContainer.y,
            referenceWidth: bcrSvgGroup.width,
            referenceHeight: bcrSvgGroup.height,
        }
    }

    const getFloorPlanBlindsConfig = (): FloorPlanBlindsConfig => {
        return {
            blinds,
            offsetX: bcrSvgGroup.x - bcrContainer.x,
            offsetY: bcrSvgGroup.y - bcrContainer.y,
            referenceWidth: bcrSvgGroup.width,
            referenceHeight: bcrSvgGroup.height,
        }
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

    return (
        <Container ref={refContainer}>
            <StyledSVG onClick={clickOnSVG} ref={refSVG} innerRef={refSVGElement} onLoad={svgLoaded} src={props.src} preserveAspectRatio='xMidYMid meet' />
            <FloorPlanTemperaturesComponent {...getFloorPlanTemperaturesConfig()} />
            <FloorPlanBlindsComponent {...getFloorPlanBlindsConfig()} />
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: relative;  
    text-align: left;
`

const StyledSVG = styled(SVG)`
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
`
