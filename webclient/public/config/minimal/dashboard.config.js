(function() {

    const widget = (type, id, props) =>  {
        return {
            "type": type,
            "properties": {
                ...props,                
                "deviceId": id
            }
        }
    }

    const tabsWidget = (props, pages) => {
        return {
            "type": "tabsWidget",
            "properties": {
                "tabsVisible": props.tabsVisible,
                "width": props.width, 
                "pages": pages,
            }
        }
    }

    const panelWidget = (widgets) => {
        return {
            "type": "panelWidget",
            "properties": {
              "widgets": widgets,
            }
        }
    }    

    const page = (title, widgets) => {
        return {
            "title": title,
            "widgets": [
                widgets.length === 1 ? widgets[0] : panelWidget(widgets)
            ]
        }        
    }

    const tabs = tabsWidget({ tabsVisible: true }, [
        page('Temperatures', [
            widget('temperatureWidget', 'tempParis'),
            widget('temperatureWidget', 'tempSydney'),
            widget('temperatureWidget', 'tempNewYork'),
            widget('temperatureWidget', 'tempLosAngeles'),
            widget('temperatureWidget', 'tempTokyo'),
        ]),
    ])

        
    const dashboard = {
        properties: {
            widgets: [
                tabs,
                widget('dummyClockLabelWidget'),
                widget('localTimerWidgetSound'),
            ],
        }
    }

    return dashboard 
}())
