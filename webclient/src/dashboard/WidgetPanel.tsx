import React from 'react';
import styled from 'styled-components';
import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';
import { WidgetProperties } from '../widgets/widgets';
import { WidgetSize } from '../widgets/widgetTexts';

//TODO: make this array initialized dynamically basing on the actual widgets used in dashboard
const widgets  = {
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
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
    position: WidgetPosition;
    properties?: WidgetProperties;
    widgetSize: WidgetSize;
}

export interface WidgetPosition {
    colNumber: number;
    colSpan: number;
    rowNumber: number;
    rowSpan: number;
};

export function WidgetPanel( { config }: { config: WidgetPanelProps}) {
    return (
        <PanelFlow>
            { config.elements.map((el, index) => { 
                if (typeof components[el.type as keyof typeof components] !== "undefined") {
                    const Widget = components[el.type as keyof typeof components];
                    return <PanelElement>
                            <Widget deviceId={el.deviceId} size={el.widgetSize} />
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

/*
export function WidgetPanel( { config }: { config: WidgetPanelProps}) {
    return (
        <PanelGrid size={config.size}>
            { config.elements.map((el, index) => { 
                if (typeof components[el.type as keyof typeof components] !== "undefined") {
                    const Widget = components[el.type as keyof typeof components];
                    return <GridEntry position={el.position} key={`Entry_${index}`} >
                        <Widget deviceId={el.deviceId} textSize={el.textSize} />
                    </GridEntry>
                } else { 
                    return <></> 
                }
            })}
        </PanelGrid>
    );
}


const PanelGrid = styled.div<{size: WidgetPaneSize}>`
    display: grid; 
    width: 100%; 
    height: 100%;
    background-color: #2F3239;
    box-shadow: 3px 3px 2px #28292E;
    border-radius: 4px;
    grid-template-columns: repeat(${props => props.size.columns}, 1fr);
    grid-template-rows: repeat(${props => props.size.rows}, 1fr);
    grid-gap: 2px;
`;


const GridEntry = styled.div<{position: WidgetPosition}>`
    grid-column: ${props => props.position.colNumber + 1} / span ${props => props.position.colSpan};
    grid-row: ${props => props.position.rowNumber + 1} / span ${props => props.position.rowSpan};
`;
*/