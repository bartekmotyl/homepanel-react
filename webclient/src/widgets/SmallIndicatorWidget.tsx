import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectRegistry } from '../registry/registrySlice';
import { IndicatorWidgetSource } from '../registry/indicators/IndicatorWidgetSource';
import { ValueClassifier } from '../registry/classifiers/ValueClassifier';
import { IconType } from 'react-icons';
import { WidgetProperties, WidgetSize } from './widgets';
import { selectDevices } from '../devices/devicesSlice';
import { widgetSizeFactor } from './widgetTexts';

export function SmallIndicatorWidget({ deviceId, size, props }: WidgetProperties) {
    const registry = useSelector(selectRegistry);
    // without using 'useSelector' content of this widget wouldn't be refreshed when device data changes 
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
  

    return (
        <Box size={size}>
            <Indicator>
              <MainContent color={ getColor() }>
                { getMdIcon() &&  
                  <ContentIcon>
                    { getMdIcon() }
                  </ContentIcon>
                }
                { getText() && 
                  <ContentText>
                    <div dangerouslySetInnerHTML={ {__html: getText() ?? "" }}/>
                  </ContentText>
                }
              </MainContent>
            { /*}
            <div class="main-content" v-bind:style="{ color: this.color}"><span v-html="text"/><v-icon class="main-content-icon">{{this.mdIcon}}</v-icon>
            </div>
            <div class="indicator-title"><span v-html="title"/></div>
            <div class="additional-info additional-info-ne" v-html="additionalInfoNE"/>
            <div class="additional-info additional-info-nw" v-html="additionalInfoNW"/>
            <div class="additional-info additional-info-se" v-html="additionalInfoSE"/>
            <div class="additional-info additional-info-sw" v-html="additionalInfoSW"/>
            */ }
            </Indicator>
        </Box>
    );
}

const Box = styled.div<{size: WidgetSize}>`
  background-color: #383C45;
  width: ${props =>  `${widgetSizeFactor(props.size) * (100)}px`};
  height: ${props =>  `${widgetSizeFactor(props.size) * (100)}px`};
`;


const ContentIcon = styled.div`
`;

const ContentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


const Indicator = styled.div`
    color: #ffffff;
    height: 100%;
    //margin: 1em;
    //border: 1px solid red;
    //position: relative;
`;

const MainContent = styled.div<{color: string}>`
  height: 100%;
  //position: relative; 
  //top: 50%; 
  //width: 100%;
  //text-align: center;
  //transform: translateY(-50%);
  //white-space: nowrap;
  //font-size: 2.8em;
  background-color: ${props =>  `${props.color}`};
`
/*
@Component
export default class SmallIndicatorWidget extends Vue {
  @Prop() private title!: string;  
  @Prop() private sourceId!: string;  
  @Prop() private classifierId!: string;  
  
  @Getter('getRegistryElementById')
  getRegistryElementById!: (id: string) => RegistryElement;

  private getSource() : IndicatorWidgetSource {
    return (this.getRegistryElementById(this.sourceId) as any) as IndicatorWidgetSource;
  }

  private getValueClassifier() : ValueClassifier | null {
    if (this.classifierId === null)
      return null; 
    
    return (this.getRegistryElementById(this.classifierId) as any) as ValueClassifier;
  }

  get text() : string | null {
    return this.getSource().text || null; 
  }

  get mdIcon() : string | null {
    return this.getSource().mdIcon || null; 
  }

  get color() : string | null {
    let color = this.getSource().color;
    if (color !== null)
      return color; 

    let classifier = this.getValueClassifier(); 
    let source = this.getSource();
    let value = source.value;
    
    if (value && classifier)  {
      color = classifier.color(value);
    } 

    return  color || "#98a7b9"; 
  }

  get additionalInfoNE() : string | null {
    return this.getSource().extraText1 || null; 
  }
  get additionalInfoNW() : string | null {
    return this.getSource().extraText2 || null; 
  }
  get additionalInfoSE() : string | null {
    return this.getSource().extraText3 || null; 
  }
  get additionalInfoSW() : string | null {
    return this.getSource().extraText4 || null; 
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.indicator {
  background-color: #2f3b52;
  width: 7em;
  height: 7em;
  color: #ffffff;
  margin: 1em;
  border-radius: 0.25em; 
  //border: 1px solid red;
  position: relative;
}
.main-content {
  position: absolute; 
  top: 50%; 
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 2.8em;
}
.main-content-icon {
  color: inherit;
  font-size: 1.0em;
}
.indicator-title {
  position:absolute; 
  left: 50%; 
  transform: translateX(-50%);
  bottom:1.0em;
  font-size: 0.75em; 
  margin: 0px;
  white-space: nowrap;
}

.additional-info {
  position:absolute; 
  font-size: 0.75em; 
  padding: 0.6em; 
  color: #657d95;
}

.additional-info-ne {
  left:0px; 
  top:0px;
}
.additional-info-nw {
  right:0px;
  top:0px; 
}
.additional-info-se {
  left:0px;
  bottom:0px; 
}
.additional-info-sw {
  right:0px;
  bottom:0px; 
}

</style>

*/