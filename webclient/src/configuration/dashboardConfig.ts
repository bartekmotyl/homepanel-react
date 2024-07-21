import { configDashboard } from "../_custom/config"
import { fetchTextAsync } from "../utils/fetchUtils"
import { WidgetConfiguration } from "../widgets/widgets"
import { configFolderPath } from "./startup"

export const minimalWidgetConfiguration: WidgetConfiguration = {
  type: "containerWidget",
  properties: {
    widgets: [
      {
        type: "dummyClockLabelWidget",
      },
    ],
  },
}

export const getDashboardConfig = async (): Promise<WidgetConfiguration> => {
  return configDashboard
}
