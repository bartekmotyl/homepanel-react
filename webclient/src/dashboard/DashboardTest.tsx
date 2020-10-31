import React from 'react';
import styled from 'styled-components';
import { WidgetPanel, WidgetPanelProps } from './WidgetPanel';
import { DashboardTab, DashboardTabs } from './DashboardTabs';

const widgetPanelProps1 : WidgetPanelProps = {
    elements: [{
        type: 'temperatureWidget', 
        deviceId: 'met-no-wroclaw-temperature', 
    }, {
        type: 'temperatureWidget', 
        deviceId: 'ble-sensor-4c65a8df7d03', 
    }, {
        type: 'temperatureWidget', 
        deviceId: 'mock-temperature-1', 
    }, {
        type: 'blindsWidget', 
        deviceId: 'roleta-salon-lewa', 
    }, {
        type: 'switchWidget', 
        deviceId: 'wiatrolap-lampa', 
    }, {
        type: 'smallIndicatorWidget', 
        deviceId: 'onewire-sensor-grunt-0-source-temperature', 
        properties: {
            classifierId: 'indoor-temperature-classifier',
        },
    }, {
        type: 'smallIndicatorWidget', 
        deviceId: 'ble-sensor-00126fc21c10-source-temperature', 
        properties: {
            classifierId: 'indoor-temperature-classifier',
        },
    }, {
        type: 'smallIndicatorWidget', 
        deviceId: 'power-meter-source', 
        properties: {
            classifierId: 'power-meter-classifier-minute',
        },
    }],
};

const widgetPanelProps2 : WidgetPanelProps = {
    elements: [{
        type: 'temperatureWidget', 
        deviceId: 'met-no-wroclaw-temperature', 
    }],
};



export function DashboardTest() {
    return (
        <ContainerStyled id="container1"> 
            <DashboardTabsStyled>
                <DashboardTab label="aaa">
                    <WidgetPanel config={widgetPanelProps1} />
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