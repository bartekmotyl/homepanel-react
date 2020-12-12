import { fetchTextAsync } from '../utils/fetchUtils';
import { WidgetConfiguration } from '../widgets/widgets';

export const minimalWidgetConfiguration : WidgetConfiguration = {
    type: 'containerWidget',
    properties: {
        widgets: [{
            type: 'linkWidget',
            properties: {
                text: 'Config',
                href: '/config',
            }
        }]
    },
}
//const url = "dashboard.json"
const url = "dashboard.config.js"
let configDashboard : WidgetConfiguration | undefined
/*
;(async function() {
    try {
        let json = await fetchJsonAsync(url);
        configDashboard = JSON.parse(json) as WidgetConfiguration
    } catch (err) {
        console.error(`Config file cannot be fetched: ${url}`)
    }
}());
*/
export const getDashboardConfig = async (): Promise<WidgetConfiguration> => { 
    if (!configDashboard) {
        try {
            //configDashboard = await fetchJsonAsync<WidgetConfiguration>(url);
            const configDashboardJs = await fetchTextAsync(url);
            console.log('config: ', configDashboardJs)
            // eslint-disable-next-line no-eval
            configDashboard = eval(configDashboardJs) as WidgetConfiguration 
        } catch (err) {
            console.error(`Config file cannot be fetched: ${url}: ${err}`)
            configDashboard = minimalWidgetConfiguration
        }
    }
    return configDashboard
}
