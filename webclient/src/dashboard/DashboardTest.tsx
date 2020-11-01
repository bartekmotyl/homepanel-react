import React from 'react';
import { WidgetConfiguration } from '../widgets/widgets';
import { ContainerWidget } from '../widgets/containers/ContainerWidget';

const widgetPanel1Config: WidgetConfiguration = {
    type: 'panelWidget',
    properties: {
        widgets: [{
            type: 'temperatureWidget', 
            properties: {
                deviceId: 'met-no-wroclaw-temperature', 
            },        
        }, {
            type: 'temperatureWidget', 
            properties: {
                deviceId: 'ble-sensor-4c65a8df7d03', 
            },        
        }, {
            type: 'temperatureWidget', 
            properties: {
                deviceId: 'mock-temperature-1', 
            },        
        }, {
            type: 'blindsWidget', 
            properties: {
                deviceId: 'roleta-salon-lewa', 
            },        
        }, {
            type: 'switchWidget', 
            properties: {
                deviceId: 'wiatrolap-lampa', 
            },        
        }, {
            type: 'smallIndicatorWidget', 
            properties: {
                deviceId: 'onewire-sensor-grunt-0-source-temperature', 
                classifierId: 'indoor-temperature-classifier',
            },
        }, {
            type: 'smallIndicatorWidget', 
            properties: {
                deviceId: 'ble-sensor-00126fc21c10-source-temperature', 
                classifierId: 'indoor-temperature-classifier',
            },
        }, {
            type: 'smallIndicatorWidget', 
            properties: {
                deviceId: 'power-meter-source', 
                classifierId: 'power-meter-classifier-minute',
            },
        }],
    }
}

const widgetPanel2Config : WidgetConfiguration =  {
    type: 'panelWidget',
    properties: {
        widgets: [{
            type: 'temperatureWidget', 
            properties: {
                deviceId: 'met-no-wroclaw-temperature', 
            },  
        }],
    },      
}

const tabs1Config : WidgetConfiguration = {
    type: 'tabsWidget',
    properties: {
        pages: [{
            title: 'Page A',
            widgets: [ widgetPanel1Config ]
        }, {
            title: 'Page B',
            widgets: [ widgetPanel2Config ]
        }],
    }
}

const containerConfig : WidgetConfiguration = {
    type: 'containerWidget',
    properties: {
        widgets: [tabs1Config],
    }
}

export function DashboardTest() {
    return (
        <ContainerWidget props={containerConfig.properties}/> 
    );
}

