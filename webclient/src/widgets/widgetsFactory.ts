import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';
import { BlindsWidget } from '../widgets/BlindsWidget';
import { SmallIndicatorWidget } from '../widgets/SmallIndicatorWidget';
import { WidgetConfiguration, WidgetProperties } from './widgets';
import { PanelWidget } from './containers/PanelWidget';
import React from 'react';
import { TabsWidget } from './containers/TabsWidget';
import { ContainerWidget } from './containers/ContainerWidget';

const widgetTypes = {
    'panelWidget': PanelWidget,
    'tabsWidget': TabsWidget,
    'containerWidget': ContainerWidget,
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
    'blindsWidget': BlindsWidget,
    'smallIndicatorWidget': SmallIndicatorWidget,
}

type WidgetTypeKey = keyof typeof widgetTypes
type WidgetFunction = (arg: WidgetProperties) => JSX.Element

export const getWidgetFunction = (config: WidgetConfiguration): WidgetFunction => {
    if (typeof widgetTypes[config.type as WidgetTypeKey] !== "undefined") {
        const widgetFunction = widgetTypes[config.type as WidgetTypeKey] as WidgetFunction;
        return widgetFunction
    } else {
        return (arg: WidgetProperties) => React.createElement('div')
    }
} 
