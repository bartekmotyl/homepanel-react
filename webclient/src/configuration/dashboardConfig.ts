import { fetchTextAsync } from '../utils/fetchUtils';
import { WidgetConfiguration } from '../widgets/widgets';
import { configFolderPath } from './startup';

export const minimalWidgetConfiguration : WidgetConfiguration = {
    type: 'containerWidget',
    properties: {
        widgets: [{
            type: 'dummyClockLabelWidget',
        }]
    },
}
const url = `${configFolderPath}/dashboard.config.js`
let configDashboard : WidgetConfiguration | undefined

export const getDashboardConfig = async (): Promise<WidgetConfiguration> => { 
    if (!configDashboard) {
        try {
            const configDashboardJs = await fetchTextAsync(url);
            // eslint-disable-next-line no-eval
            configDashboard = eval(configDashboardJs) as WidgetConfiguration 
        } catch (err) {
            console.error(`Config file cannot be fetched: ${url}: ${err}`)
            configDashboard = minimalWidgetConfiguration
        }
    }
    return configDashboard
}
