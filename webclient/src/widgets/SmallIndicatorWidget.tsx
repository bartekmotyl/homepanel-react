import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IndicatorWidgetSource } from '../registry/indicators/IndicatorWidgetSource'
import { ValueClass, ValueClassifier } from '../registry/classifiers/ValueClassifier'
import { WidgetProperties } from './widgets'
import { selectDevices } from '../devices/devicesSlice'
import { Icon } from '@material-ui/core'
import SVG from "react-inlinesvg"
import { asInterface } from '../utils/cast'

export function SmallIndicatorWidget({ props }: WidgetProperties) {
    const deviceId = props.deviceId as string
    const devices = useSelector(selectDevices)
    const classifierId = props.classifierId

    // in case of SmallIndicatorWidget the deviceId is in fact a key in registry
    const source = asInterface<IndicatorWidgetSource>(deviceId, devices.get(deviceId))
    
    const getValueClassifier = () : ValueClassifier | null => {
      if (classifierId === null)
        return null
      return asInterface<ValueClassifier>(classifierId, devices.get(classifierId))
    }
  
  
    const getColor = () : string => {
      if (source.getIsUpToDate() === false) {
        return ValueClass.Undefined
      }

      let color = source.getColor()
      if (color)
        return color; 
  
      let classifier = getValueClassifier(); 
      let value = source.getValue()
      
      
      if ((value || value === 0) && classifier)  {
        color = classifier.classify(value);
      } 
  
      return  color || "#98a7b9"; 
    }
    
    const svgUrl: string | null = typeof source.getIcon() === "string" ? source.getIcon() as string : null

    return (
        <Box color={ getColor() }>
              <MainContent>
                { svgUrl &&
                  <Icon>
                    <StyledSVG src={svgUrl}/>
                  </Icon>
                }
                { source.getText() && 
                  <ContentText>
                    <div dangerouslySetInnerHTML={ {__html: source.getText()! }}/>
                  </ContentText>
                }
                <Title dangerouslySetInnerHTML={ {__html: source.getName() }} />

              </MainContent>
              <AdditionalInfoNE dangerouslySetInnerHTML={ {__html: source.getExtraText1() ?? "" }} />
              <AdditionalInfoNW dangerouslySetInnerHTML={ {__html: source.getExtraText2() ?? "" }} />
              <AdditionalInfoSE dangerouslySetInnerHTML={ {__html: source.getExtraText3() ?? "" }} />
              <AdditionalInfoSW dangerouslySetInnerHTML={ {__html: source.getExtraText4() ?? "" }} />              
        </Box>
    );
}

const Box = styled.div<{color: string}>`
  background-color: ${props =>  `${props.color}`};
  color: white; 
  width: 6rem;
  height: 6rem;
  position: relative;
  padding: 0.5rem;
`;

const StyledSVG = styled(SVG)`
  width: 3.5rem;
  height: 3.5rem;
  & path {
    fill: white;
  }
`;


const ContentText = styled.div`
  font-weight: bold;
`;

const MainContent = styled.div`
  height: 100%;
  text-align: center;
  font-size: 2.3rem;
`

const Title = styled.div`
  font-size: 0.85rem; 
  white-space: normal;
  font-weight: bold;

`

const AdditionalInfo = styled.div`
  position: absolute;
  padding: 0.05rem;
  font-size: 0.5rem; 
`
const AdditionalInfoNE = styled(AdditionalInfo)`
  left: 0; 
  top: 0;
`

const AdditionalInfoNW = styled(AdditionalInfo)`
  right:0;
  top:0; 
`

const AdditionalInfoSE = styled(AdditionalInfo)`
  left: 0;
  bottom: 0; 
`

const AdditionalInfoSW = styled(AdditionalInfo)`
  right: 0;
  bottom: 0; 
`