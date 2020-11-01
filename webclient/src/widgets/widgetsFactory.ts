import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';
import { BlindsWidget } from '../widgets/BlindsWidget';
import { SmallIndicatorWidget } from '../widgets/SmallIndicatorWidget';
import { WidgetConfiguration, WidgetProperties } from './widgets';
import { PanelWidget } from './containers/PanelWidget';

const widgetTypes = {
    'panelWidget': PanelWidget,
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
    'blindsWidget': BlindsWidget,
    'smallIndicatorWidget': SmallIndicatorWidget,
}

type WidgetTypeKey = keyof typeof widgetTypes
type WidgetFunction = (arg: WidgetProperties) => JSX.Element

export const getWidgetFunction = (config: WidgetConfiguration): WidgetFunction | undefined => {
    if (typeof widgetTypes[config.type as WidgetTypeKey] !== "undefined") {
        const widgetFunction = widgetTypes[config.type as WidgetTypeKey] as WidgetFunction;
        return widgetFunction
    } 
} 
