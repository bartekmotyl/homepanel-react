import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Device } from "../../devices/Device";
import { selectDevices } from "../../devices/devicesSlice";
import { FloorPlanLight, FloorPlanPoint } from "./FloorPlanWidget";
import SVG from 'react-inlinesvg';
import { Light, Switch } from "../../devices/interfaces/generic/genericDevices";

export interface FloorPlanLightsConfig {
    lights: FloorPlanLight[]
    offsetX: number,
    offsetY: number,
    referenceWidth: number,
    referenceHeight: number,
}

export const FloorPlanLightsComponent : React.FunctionComponent<FloorPlanLightsConfig> = props => {
    const lights = props.lights

    const offsetPoint = (point: FloorPlanPoint) => {
        return {
            x: props.offsetX + point.x * props.referenceWidth,
            y: props.offsetY + point.y * props.referenceHeight,
        };
    }

    const getLightLocation = (i: number) => {
        return offsetPoint(lights[i].location)
    }

    const devices = useSelector(selectDevices);

    const getDevice = (id: string): Device | null => {
        return (devices.get(id) as any) as Device;
    }    

    const getLightState = (light: FloorPlanLight) => {
        const devLight = getDevice(light.deviceId)! as any as Light
        return devLight.getState()
    }
    const getLightTitle = (light: FloorPlanLight) => {
        const devLight = getDevice(light.deviceId)!
        return devLight.getName()
    }

    const lightClicked = (light: FloorPlanLight) => {
        if (light.switchable) {
            const devSwitch = getDevice(light.deviceId)! as any as Switch
            devSwitch.toggle()
        }
    }
    return (
        <>
            { lights && lights.map((light, index) => {
                return (
                    <LightBox key={`light_${light.deviceId}_box`} style={
                        {
                            left: getLightLocation(index).x,
                            top: getLightLocation(index).y,
                            width: 0.05 * props.referenceWidth ?? 0,
                            height: 0.05 * props.referenceHeight ?? 0,
                        }
                    } onClick={() => lightClicked(light)}>
                        { getLightState(light) === true && (
                            <LightIconOn src="svg/small/093-lamp.svg" />
                        ) }
                        { getLightState(light) === false && (
                            <LightIconOff src="svg/small/092-lamp-1.svg" />
                        ) }
                        { /*
                        <LightIconTitle $referenceWidth={props.referenceWidth} dangerouslySetInnerHTML={{ __html: getLightTitle(light) }} />
                        */ }
                    </LightBox>
                )
            })}
        </>
    )
}


const LightBox = styled.div`
    position: absolute;
`
const LightIconOn = styled(SVG)`
    position: absolute;
    top: 0;
    left: 0;
    & path {
        fill: #AEDC84;
    }
`
const LightIconOff = styled(SVG)`
    position: absolute;
    top: 0;
    left: 0;
    & path {
        fill: white;
    }
`
const LightIconTitle = styled.div<{ $referenceWidth: number }>`
    position: absolute;
    top: calc(100% );
    text-align: center;
    color: white;
    font-size: ${props =>  `${props.$referenceWidth * 0.025}px`};
    width: 100%;
    overflow-x: visible;
`