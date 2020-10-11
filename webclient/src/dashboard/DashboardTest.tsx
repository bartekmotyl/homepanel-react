import React from 'react';
import styled from 'styled-components';
import { WidgetSize } from '../widgets/widgetTexts';
import { WidgetPanel, WidgetPanelProps } from './WidgetPanel';
import { DashboardTab, DashboardTabs } from './DashboardTabs';

const widgetSize = WidgetSize.M;

const widgetPanelProps : WidgetPanelProps = {
    size: { rows: 4, columns: 6},
    elements: [{
        type: 'temperatureWidget', 
        deviceId: 'met-no-wroclaw-temperature', 
        position: { colNumber: 5, rowNumber: 3, colSpan: 1, rowSpan: 1 },
        widgetSize: widgetSize,
    }, {
        type: 'temperatureWidget', 
        deviceId: 'ble-sensor-4c65a8df7d03', 
        position: { colNumber: 0, rowNumber: 0, colSpan: 1, rowSpan: 1 },
        widgetSize: widgetSize,
    }, {
        type: 'temperatureWidget', 
        deviceId: 'mock-temperature-1', 
        position:{ colNumber: 1, rowNumber: 0, colSpan: 1, rowSpan: 1 },
        widgetSize: widgetSize,
    }, {
        type: 'switchWidget', 
        deviceId: 'wiatrolap-lampa', 
        position: { colNumber: 2, rowNumber: 1, colSpan: 2, rowSpan: 2 },
        widgetSize: WidgetSize.XL,
    }],
};

const widgetPanelProps2 : WidgetPanelProps = {
    size: { rows: 4, columns: 6},
    elements: [{
        type: 'temperatureWidget', 
        deviceId: 'met-no-wroclaw-temperature', 
        position: { colNumber: 1, rowNumber: 1, colSpan: 3, rowSpan: 3 },
        widgetSize: WidgetSize.XL,
    }],
};



export function DashboardTest() {
    return (
        <ContainerStyled id="container1"> 
            <DashboardTabsStyled>
                <DashboardTab label="aaa">
                    <WidgetPanel config={widgetPanelProps} />
                </DashboardTab>
                <DashboardTab label="bbb">
                    <WidgetPanel config={widgetPanelProps2} />
                </DashboardTab>  
            </DashboardTabsStyled>
        
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div`
    width: 100vw;
    height: 100vh;  
    background-color: #2E2F34;
    /* background-color: pink; */
`;

const DashboardTabsStyled = styled(DashboardTabs)`
    width: 100%;
`;