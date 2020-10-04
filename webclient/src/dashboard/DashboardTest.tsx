import React from 'react';
import styled from 'styled-components';
import { WidgetTextSize } from '../widgets/widgetTexts';
import { WidgetPanel, WidgetPanelProps } from './WidgetPanel';

const textSize = WidgetTextSize.M;

const widgetPanelProps : WidgetPanelProps = {
    size: { rows: 4, columns: 6},
    elements: [{
        type: 'temperatureWidget', 
        deviceId: 'met-no-wroclaw-temperature', 
        position: { colNumber: 5, rowNumber: 3, colSpan: 1, rowSpan: 1 },
        textSize: textSize,
    }, {
        type: 'temperatureWidget', 
        deviceId: 'ble-sensor-4c65a8df7d03', 
        position: { colNumber: 0, rowNumber: 0, colSpan: 1, rowSpan: 1 },
        textSize: textSize,
    }, {
        type: 'temperatureWidget', 
        deviceId: 'mock-temperature-1', 
        position:{ colNumber: 1, rowNumber: 0, colSpan: 1, rowSpan: 1 },
        textSize: textSize,
    }, {
        type: 'switchWidget', 
        deviceId: 'wiatrolap-lampa', 
        position: { colNumber: 2, rowNumber: 1, colSpan: 2, rowSpan: 2 },
        textSize: WidgetTextSize.XL,
    }],
};

export function DashboardTest() {
    return (
        <>
            <Container1>
                <WidgetPanel config={widgetPanelProps} />
            </Container1>
        </>        
    );
}


const Container1 = styled.div`
    width: 100vw;
    height: 66vw;  
    background-color: pink;
`;
