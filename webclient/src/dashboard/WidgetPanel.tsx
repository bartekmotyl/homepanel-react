import React from 'react';
import styled from 'styled-components';
import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';
import { BlindsWidget } from '../widgets/BlindsWidget';
import { WidgetSize } from '../widgets/widgets';
import { SmallIndicatorWidget } from '../widgets/SmallIndicatorWidget';

//TODO: make this array initialized dynamically basing on the actual widgets used in dashboard
const widgets = {
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
    'blindsWidget': BlindsWidget,
    'smallIndicatorWidget': SmallIndicatorWidget,
}

const components = widgets;


export interface WidgetPaneSize {
    rows: number;
    columns: number;
} 
export interface WidgetPanelProps {
    size: WidgetPaneSize;
    elements: WidgetPanelElement[];
}

export interface WidgetPanelElement {
    type: string,
    deviceId: string,
    widgetSize: WidgetSize;
    properties?: any;
}

export function WidgetPanel( { config }: { config: WidgetPanelProps}) {
    return (
        <PanelFlow>
            { config.elements.map((el, index) => { 
                if (typeof components[el.type as keyof typeof components] !== "undefined") {
                    const Widget = components[el.type as keyof typeof components];
                    return <PanelElement key={ `PanelElement_${el.deviceId}`} >
                            <Widget deviceId={el.deviceId} size={el.widgetSize} props={el.properties}/>
                        </PanelElement>
                } else { 
                    return <></> 
                }
            })}
        </PanelFlow>
    );
}

const PanelElement = styled.div`
    /*
    margin-inline-start: 10px;
    margin-block-start: 10px; 
    */
    margin-left: 2px;
    margin-top: 2px;

`;

const PanelFlow = styled.div`
    display: flex; 
    width: 100%; 
    height: 100%;
    /* padding: 10px; */
    background-color: #2F3239;
    /* background-color: turquoise; */
    flex-wrap: wrap;
    justify-content: flex-start;
    /* margin: 5px;*/
 `;
