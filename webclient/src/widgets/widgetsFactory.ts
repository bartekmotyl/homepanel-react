import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';
import { BlindsWidget } from '../widgets/BlindsWidget';
import { SmallIndicatorWidget } from '../widgets/SmallIndicatorWidget';
import { WidgetConfiguration, WidgetProperties } from './widgets';
import { PanelWidget } from './containers/PanelWidget';
import React from 'react';
import { TabsWidget } from './containers/TabsWidget';
import { ContainerWidget } from './containers/ContainerWidget';
import { LinkWidget } from './LinkWidget';
import { TickerWidget } from './containers/TickerWidget';
import { SideBySideWidget } from './containers/SideBySideWidget';
import { RemoteImageWidget } from './RemoteImageWidget';
import { FloorPlanWidget } from './floorplan/FloorPlanWidget';
import { DummyClockLabelWidget } from './DummyClockLabelWidget';
import { ReloadWidget } from './ReloadWidget';
import { IframeWidget } from './IframeWidget';
import { LocalTimerWidget } from './LocalTimerWidget';
import { LocalTimerWidgetSound } from './LocalTimerWidgetSound';
import { SwitchWidgetColored } from "./SwitchWidgetColored";
import { LabelWidget } from "./LabelWidget";
import { GridWidget } from "./containers/GridWidget";
import {GroupWidget} from "./containers/GroupWidget";

//TODO: is it possible to fill this map automatically from all widgets available in this folder/subfolders?
const widgetTypes = {
    'panelWidget': PanelWidget,
    'tabsWidget': TabsWidget,
    'gridWidget': GridWidget,
    'containerWidget': ContainerWidget,
    'groupWidget': GroupWidget,
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
    'switchWidgetColored': SwitchWidgetColored,
    'blindsWidget': BlindsWidget,
    'smallIndicatorWidget': SmallIndicatorWidget,
    'linkWidget': LinkWidget,
    'tickerWidget': TickerWidget,
    'sideBySideWidget': SideBySideWidget,
    'remoteImageWidget': RemoteImageWidget,
    'floorPlanWidget': FloorPlanWidget,
    'dummyClockLabelWidget': DummyClockLabelWidget,
    'reloadWidget': ReloadWidget,
    'iframeWidget': IframeWidget,
    'localTimerWidget': LocalTimerWidget,
    'localTimerWidgetSound': LocalTimerWidgetSound,
    'labelWidget': LabelWidget
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
