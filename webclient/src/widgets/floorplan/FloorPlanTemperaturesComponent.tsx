import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Device } from "../../devices/Device"
import { selectDevices } from "../../devices/devicesSlice"
import { ValueClassifier } from "../../registry/classifiers/ValueClassifier"
import { FloorPlanPoint, FloorPlanTemperature } from "./FloorPlanWidget"
import SVG from 'react-inlinesvg'
import { Temperature } from "../../devices/interfaces/generic/genericDevices"
import { AsTemperature } from "../../registry/converters/genericConverters"
import { asInterface } from "../../utils/cast"

export interface FloorPlanTemperaturesConfig {
    temperatures: FloorPlanTemperature[]
    offsetX: number,
    offsetY: number,
    referenceWidth: number,
    referenceHeight: number,
}

export const FloorPlanTemperaturesComponent : React.FunctionComponent<FloorPlanTemperaturesConfig> = props => {
    const temperatures = props.temperatures

    const offsetPoint = (point: FloorPlanPoint) => {
        return {
            x: props.offsetX + point.x * props.referenceWidth,
            y: props.offsetY + point.y * props.referenceHeight,
        }
    }

    const getTemperatureLocation = (i: number) => {
        return offsetPoint(temperatures[i].location)
    }

    const devices = useSelector(selectDevices)

    const getDevice = (id: string): Device | undefined => {
        return devices.get(id)
    }    

    const getTemperatureValue = (temp: FloorPlanTemperature) => {
        const device = getDevice(temp.deviceId)!
        const converter = temp.converterId ? asInterface<AsTemperature>(temp.converterId, getDevice(temp.converterId)) : undefined

        if (converter) {
            return converter.getTemperature(device)
        } else {
            const tempDevice = asInterface<Temperature>(temp.deviceId, device)
            return tempDevice.getTemperature()
        }
    }
    const getTemperatureValueText = (temp: FloorPlanTemperature) => {
        const value = getTemperatureValue(temp)
        return value  && typeof value === 'number' ? value.toFixed(1) + "&deg;" : "N/A"
    }
    const getTemperatureColor = (temp: FloorPlanTemperature) => {
        const value = getTemperatureValue(temp)
        const classifier = temp.classifierId ? getDevice(temp.classifierId) as ValueClassifier : undefined
        let color = "#707b7c"
        if (value && classifier && typeof value === 'number') {
            color = classifier.classify(value.toFixed())!
        }
        return color || "#98a7b9"
    }    

    return (
        <>
            { temperatures && temperatures.map((temp, index) => {
                return (
                    <TemperatureBox key={`temp_${temp.deviceId}_box`} style={
                        {
                            left: getTemperatureLocation(index).x,
                            top: getTemperatureLocation(index).y,
                            width: 0.05 * props.referenceWidth ?? 0,
                            height: 0.05 * props.referenceHeight ?? 0,
                        }
                    }>
                        <TemperatureIconInner src="svg/small/073-temperature-inner.svg" color={getTemperatureColor(temp)} />
                        <TemperatureIconOutline src="svg/small/073-temperature-1.svg" />
                        <TemperatureIconTitle $referenceWidth={props.referenceWidth} dangerouslySetInnerHTML={{ __html: getTemperatureValueText(temp) }} />
                    </TemperatureBox>
                )
            })}
        </>
    )
}


const TemperatureBox = styled.div`
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
`