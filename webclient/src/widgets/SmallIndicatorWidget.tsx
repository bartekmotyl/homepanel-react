import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectRegistry } from '../registry/registrySlice';
import { IndicatorWidgetSource } from '../registry/indicators/IndicatorWidgetSource';
import { ValueClassifier } from '../registry/classifiers/ValueClassifier';
import { IconType } from 'react-icons';
import { WidgetProperties } from './widgets';
import { selectDevices } from '../devices/devicesSlice';

export function SmallIndicatorWidget({ deviceId, props }: WidgetProperties) {
    const registry = useSelector(selectRegistry);
    
    // without using 'useSelector' content of this widget wouldn't be refreshed when device data changes 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const devices = useSelector(selectDevices);
        
    const classifierId = props.classifierId;

    // in case of SmallIndicatorWidget the deviceId is in fact a key in registry
    const source = registry.get(deviceId) as any as IndicatorWidgetSource;
    
    const getValueClassifier = () : ValueClassifier | null => {
      if (classifierId === null)
        return null; 
      
      return (registry.get(classifierId) as any) as ValueClassifier;
    }
  
  
    const getMdIcon = () : IconType | null => {
      return source.getMdIcon?.() || null; 
    }
  
    const getText = () : string | null => {
      return source.getText?.() || null; 
    }
    const getTitle = () : string  => {
      return source.getTitle(); 
    }

    const getColor = () : string => {
      let color = source.getColor?.();
      if (color)
        return color; 
  
      let classifier = getValueClassifier(); 
      let value = source.getValue?.();
      
      if (value && classifier)  {
        color = classifier.color(value);
      } 
  
      return  color || "#98a7b9"; 
    }
    const Icon = getMdIcon(); 

    return (
        <Box color={ getColor() }>
              <MainContent>
                { Icon &&
                  <ContentIcon>
                    <Icon/>
                  </ContentIcon>
                }
                { getText() && 
                  <ContentText>
                    <div dangerouslySetInnerHTML={ {__html: getText() ?? "" }}/>
                  </ContentText>
                }
                <Title dangerouslySetInnerHTML={ {__html: getTitle() }} />

              </MainContent>
              <AdditionalInfoNE dangerouslySetInnerHTML={ {__html: source.getExtraText1?.() ?? "" }} />
              <AdditionalInfoNW dangerouslySetInnerHTML={ {__html: source.getExtraText2?.() ?? "" }} />
              <AdditionalInfoSE dangerouslySetInnerHTML={ {__html: source.getExtraText3?.() ?? "" }} />
              <AdditionalInfoSW dangerouslySetInnerHTML={ {__html: source.getExtraText4?.() ?? "" }} />              
        </Box>
    );
}

const Box = styled.div<{color: string}>`
  background-color: ${props =>  `${props.color}`};
  color: white; 
  width: 5rem;
  height: 5rem;
  position: relative;
`;


const ContentIcon = styled.div`
`;

const ContentText = styled.div`
  font-weight: bold;
`;

const MainContent = styled.div`
  height: 100%;
  text-align: center;
  font-size: 1.8rem;
`

const Title = styled.div`
  font-size: 0.7rem; 
  white-space: nowrap;
  font-weight: bold;
`

const AdditionalInfoNE = styled.div`
  position: absolute;
  font-size: 0.4rem; 
  left:0px; 
  top:0px;
`

const AdditionalInfoNW = styled.div`
  font-size: 0.4rem; 
  right:0px;
  top:0px; 
`

const AdditionalInfoSE = styled.div`
  font-size: 0.4rem; 
  left: 0px;
  bottom: 0px; 
`

const AdditionalInfoSW = styled.div`
  font-size: 0.4rem; 
  right: 0px;
  bottom: 0px; 
`