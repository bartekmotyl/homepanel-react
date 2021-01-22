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

    const dashboard = {
        properties: {
            widgets: [
                widget('localTimerWidget', 'timer-1-minute', {title: '1 minute'}),
                widget('dummyClockLabelWidget'),
                widget('localTimerWidgetSound'),
            ],
        }
    }

    return dashboard 
}())
