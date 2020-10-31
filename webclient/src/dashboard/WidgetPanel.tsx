import React from 'react';
import styled from 'styled-components';
import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';
import { BlindsWidget } from '../widgets/BlindsWidget';
import { SmallIndicatorWidget } from '../widgets/SmallIndicatorWidget';

//TODO: make this array initialized dynamically basing on the actual widgets used in dashboard
const widgets = {
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
    'blindsWidget': BlindsWidget,
    'smallIndicatorWidget': SmallIndicatorWidget,
}

const components = widgets;



export interface WidgetPanelProps {
    elements: WidgetPanelElement[];
}

export interface WidgetPanelElement {
    type: string,
    properties?: any;
}

export function WidgetPanel( { config }: { config: WidgetPanelProps}) {
    return (
        <PanelFlow>
            { config.elements.map((el, index) => { 
                if (typeof components[el.type as keyof typeof components] !== "undefined") {
                    const Widget = components[el.type as keyof typeof components];
                    return <PanelElement key={`PanelElement_${index}`} >
                            <Widget props={el.properties}/>
                        </PanelElement>
                } else { 
                    return <></> 
                }
            })}
        </PanelFlow>
    );
}

const PanelElement = styled.div`
    margin-left: 0.2rem;
    margin-top: 0.2rem;
`;

const PanelFlow = styled.div`
    display: flex; 
    width: 100%; 
    height: 100%;
    background-color: #2F3239;
    flex-wrap: wrap;
    justify-content: flex-start;
 `;
