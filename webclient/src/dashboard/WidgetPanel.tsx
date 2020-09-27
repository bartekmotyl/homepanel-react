import React from 'react';
import styled from 'styled-components';
import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';

const widgets  = {
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
}
const components = widgets;



interface Props {
    rows: number;
    columns: number;
}

export interface WidgetPosition {
    colNumber: number;
    colSpan: number;
    rowNumber: number;
    rowSpan: number;
};



export function WidgetPanel({rows, columns} : Props) {
    const config = [
        {
            type: 'temperatureWidget', name: 'ble-sensor-4c65a8df7d03', position:
                { colNumber: 0, rowNumber: 0, colSpan: 1, rowSpan: 1 }
        },
        {
            type: 'temperatureWidget', name: 'mock-temperature-1', position:
                { colNumber: 1, rowNumber: 0, colSpan: 1, rowSpan: 1 }
        },
        {
            type: 'switchWidget', name: 'wiatrolap-lampa', position:
                { colNumber: 2, rowNumber: 1, colSpan: 3, rowSpan: 2 }
        },
        {
            type: 'temperatureWidget', name: 'met-no-wroclaw-temperature', position:
                { colNumber: 5, rowNumber: 3, colSpan: 1, rowSpan: 1 }
        },
    ];

    return (
        <PanelGrid>
            { config.map((el, index) => { 
                if (typeof components[el.type as keyof typeof components] !== "undefined") {
                    const Widget = components[el.type as keyof typeof components];
                    return <GridEntry position={el.position} key={`Entry_${index}`} >
                        <Widget deviceId={el.name}  />
                    </GridEntry>
                } else { 
                    return <></> 
                }
            })}
        </PanelGrid>
    );
}


const PanelGrid = styled.div`
    display: grid; 
    width: 100%; 
    height: 100%;
    background-color: #2F3239;
    box-shadow: 3px 3px 2px #28292E;
    border-radius: 4px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 2px;
`;


type GridEntryProps = {
    position: WidgetPosition,
}

const GridEntry = styled.div<GridEntryProps>`
    grid-column: ${props => props.position.colNumber + 1} / span ${props => props.position.colSpan};
    grid-row: ${props => props.position.rowNumber + 1} / span ${props => props.position.rowSpan};
`;