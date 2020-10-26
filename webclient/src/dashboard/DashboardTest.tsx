import React from 'react';
import styled from 'styled-components';
import { WidgetPanel, WidgetPanelProps } from './WidgetPanel';
import { DashboardTab, DashboardTabs } from './DashboardTabs';
import { WidgetSize } from '../widgets/widgets';

const widgetSize = WidgetSize.M;

const widgetPanelProps : WidgetPanelProps = {
    size: { rows: 4, columns: 6},
    elements: [{
        type: 'temperatureWidget', 
        deviceId: 'met-no-wroclaw-temperature', 
        widgetSize: widgetSize,
    }, {
        type: 'temperatureWidget', 
        deviceId: 'ble-sensor-4c65a8df7d03', 
        widgetSize: widgetSize,
    }, {
        type: 'temperatureWidget', 
        deviceId: 'mock-temperature-1', 
        widgetSize: widgetSize,
    }, {
        type: 'blindsWidget', 
        deviceId: 'roleta-salon-lewa', 
        widgetSize: widgetSize,
    }, {
        type: 'switchWidget', 
        deviceId: 'wiatrolap-lampa', 
        widgetSize: widgetSize,
    }, {
        type: 'smallIndicatorWidget', 
        deviceId: 'onewire-sensor-grunt-0-source-temperature', 
        widgetSize: widgetSize,
        properties: {
            classifierId: 'indoor-temperature-classifier',
        },
    }, {
        type: 'smallIndicatorWidget', 
        deviceId: 'ble-sensor-00126fc21c10-source-temperature', 
        widgetSize: widgetSize,
        properties: {
            classifierId: 'indoor-temperature-classifier',
        },
    }, {
        type: 'smallIndicatorWidget', 
        deviceId: 'power-meter-source', 
        widgetSize: widgetSize,
        properties: {
            classifierId: 'power-meter-classifier-minute',
        },
    }],
};

const widgetPanelProps2 : WidgetPanelProps = {
    size: { rows: 4, columns: 6},
    elements: [{
        type: 'temperatureWidget', 
        deviceId: 'met-no-wroclaw-temperature', 
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