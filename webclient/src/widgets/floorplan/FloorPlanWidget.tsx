import React, {  } from 'react';
import { WidgetProperties  } from '../widgets';
import styled from 'styled-components';
import { ValueClassifier } from '../../registry/classifiers/ValueClassifier';
import { useSelector } from 'react-redux';
import { selectDevices } from '../../devices/devicesSlice';
import { Device } from '../../devices/Device';
import { AsTemperature } from '../../registry/genericConverters';
import { Temperature } from '../../devices/interfaces/generic/genericDevices';
import SVG from 'react-inlinesvg';



interface FloorPlanTemperature {
  rect: DOMRect,
  deviceId: string,
  converterId?: string, 
  classifierId?: string 
}

export function FloorPlanWidget({ props }: WidgetProperties) {
    const temperatures: FloorPlanTemperature[] = props.temperatures
    const devices = useSelector(selectDevices);
    
    const getDevice = (id: string) : Device | null => {
      return (devices.get(id) as any) as Device;
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
      if (value && classifier)  {
        color = classifier.classify(value.toFixed())!;
      } 
      return  color || "#98a7b9"; 
    } 
    const refSVG = React.useRef<SVG>(null)
    const refSVGElement = React.useRef<SVGElement>(null)
    const refContainer = React.useRef<HTMLDivElement>(null)
    
    const [bcrSvgGroup, setBcrSvgGroup] = React.useState<DOMRect>(new DOMRect());
    const [bcrContainer, setBcrContainer] = React.useState<DOMRect>(new DOMRect());
    
    //const [refContainer, posContainer] = useMeasure<HTMLDivElement>();
    //const [refSVGBox, posSVG] = useMeasure<HTMLElement>();


    const getTemperatureLocation = (i: number) => {
      const rect = temperatures[i].rect 
      const width = rect.width * bcrSvgGroup.width
      const height = rect.height * bcrSvgGroup.height

      return {
        width: width,
        height: height,
        x:  (bcrSvgGroup.x - bcrContainer.x) +  rect.x * bcrSvgGroup.width - width/2, 
        y:  (bcrSvgGroup.y - bcrContainer.y) + rect.y * bcrSvgGroup.height - height/2, 
      };
    }

    const svgLoaded = () => {
      //console.log('container', refContainer.current)
      //console.log('SVGElement', refSVGElement.current)
      //console.log('SVG', refSVG.current)      
      //console.log('SVGElement BCR', refSVGElement.current?.getBoundingClientRect())
      
      const svgGroupElement = refSVGElement.current?.getElementsByTagName('g')[0]
      //console.log('SVGElement Group BRC', svgGroupElement?.getBoundingClientRect())
      //console.log('Container BCR', refContainer.current?.getBoundingClientRect())
      setBcrSvgGroup(svgGroupElement?.getBoundingClientRect()!)
      setBcrContainer(refContainer.current?.getBoundingClientRect()!)
    }
    
    const clickOnSVG = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      const svgGroupElement = refSVGElement.current?.getElementsByTagName('g')[0]
      const svgRect = svgGroupElement?.getBoundingClientRect()!
      const posX = event.clientX - svgRect.x
      const posY = event.clientY - svgRect.y
      alert(`[${(posX/svgRect.width).toFixed(3)}, ${(posY/svgRect.height).toFixed(3)}]`)
    }
    /*
    const bbox = refContainer.current?.getBoundingClientRect()
    useEffect(() => 
    {
    })
*/

  return (
    <Container ref={refContainer}>
      <StyledSVG  onClick={clickOnSVG} ref={refSVG} innerRef={refSVGElement} onLoad={svgLoaded} src={props.src} preserveAspectRatio='xMidYMid meet'/>
      { temperatures && temperatures.map( (temp, index) => {
          return (
            <TemperatureBox key={`${temp.deviceId}_box`} style= { 
              {
              left: getTemperatureLocation(index).x, 
              top: getTemperatureLocation(index).y,
              width: getTemperatureLocation(index).width,
              height: getTemperatureLocation(index).height,
              } 
            }>
              <TemperatureIconInner src="svg/small/073-temperature-inner.svg" color={getTemperatureColor(temp)} />
              <TemperatureIconOutline src="svg/small/073-temperature-1.svg" />
              <TemperatureIconTitle dangerouslySetInnerHTML={ {__html: getTemperatureValueText(temp) }} />
            </TemperatureBox>
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
  width: 5%;
  height: 5%;
`

const TemperatureIconOutline = styled(SVG)`
  position: absolute;
  top: 0;
  left: 0;
  & path {
    fill: "#98a7b9"; 
  }
` 
const TemperatureIconInner = styled(SVG)<{color: string}>`
  position: absolute;
  top: 0;
  left: 0;
  & path {
    fill: ${props =>  `${props.color}`};
  }
` 
const TemperatureIconTitle  = styled.div`
  position: absolute;
  top: 100%;
  text-align: center;
  color: white;
  font-size: 0.65em;
  width: 100%;
`


const StyledSVG = styled(SVG)`
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`



