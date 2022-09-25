import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IndicatorWidgetSource } from '../registry/indicators/IndicatorWidgetSource'
import { ValueClass, ValueClassifier } from '../registry/classifiers/ValueClassifier'
import { WidgetProperties } from './widgets'
import { selectDevices } from '../devices/devicesSlice'
//import { Icon } from '@mui/material'
import SVG from "react-inlinesvg"
import { asInterface } from '../utils/cast'

type SmallIndicatorWidgetInternalProperties = {
  color: string,
  svgUrl: string | null,
  text: string | null,
  name: string,
  extraText1: string,
  extraText2: string,
  extraText3: string,
  extraText4: string,
}

function SmallIndicatorWidgetInternal(props: SmallIndicatorWidgetInternalProperties) {
  return (
    <Box color={ props.color }>
          <MainContent>
            { props.svgUrl &&
              <div>
                <StyledSVG src={props.svgUrl}/>
              </div>
            }
            { props.text && 
              <ContentText>
                <div dangerouslySetInnerHTML={ {__html: props.text! }}/>
              </ContentText>
            }
            <Title dangerouslySetInnerHTML={ {__html: props.name }} />

          </MainContent>
          <AdditionalInfoNE dangerouslySetInnerHTML={ {__html: props.extraText1}} />
          <AdditionalInfoNW dangerouslySetInnerHTML={ {__html: props.extraText2}} />
          <AdditionalInfoSE dangerouslySetInnerHTML={ {__html: props.extraText3}} />
          <AdditionalInfoSW dangerouslySetInnerHTML={ {__html: props.extraText4}} />              
    </Box>
  );
}

const SmallIndicatorWidgetInternalMemo = React.memo(SmallIndicatorWidgetInternal)

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
        <SmallIndicatorWidgetInternalMemo color={getColor()} name={source.getName()} text={source.getText()} svgUrl={svgUrl}
          extraText1={source.getExtraText1() ?? ""} extraText2={source.getExtraText2() ?? ""} 
          extraText3={source.getExtraText3() ?? ""} extraText4={source.getExtraText4() ?? ""} />            
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