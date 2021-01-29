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

    const sideBySideWidget = (widgets) => {
        return {
            "type": "sideBySideWidget",
            "properties": {
              "widgets": widgets,
            }
        }
    }    

    const leftSideTabs = tabsWidget({ width: "22rem", tabsVisible: true }, [
        page('Ref', [
        ]),
        page('Temperatures', [
        ]),
    ])
    const rightSideTabs = tabsWidget({ width: "calc(100vw - 23rem)", tabsVisible: true }, [
        page('Office', [
            widget('switchWidget', 'lightOffice', {title: 'Office'}),
            widget('blindsWidget', 'blindsOffice', {title: 'Office'}),         
            widget('temperatureWidget', 'tempOffice', {title: 'Office'})           
        ]),
        page('Charts', [
            tabsWidget({ tabsVisible: true }, [
                page('CERN', [
                    widget('iframeWidget', 'nodev-grafana-iframe2', { url: 'https://monit-grafana-open.cern.ch/d/000000505/perfsonar-e2e-performance?orgId=16'}),
                ]),
                page('Wiki', [
                    widget('iframeWidget', 'nodev-grafana-iframe1', { url: 'https://grafana.wikimedia.org/d/000000208/edit-count?orgId=1&refresh=5m'}),
                ]),
            ])
        ]),
        page('Cameras', [
            tabsWidget({ tabsVisible: true }, [
                page('Office', [
                    widget('remoteImageWidget', 'remote-image-webcam1', { src: 'http://1l10olo1110l1lo1l01oo01l101l1.drivemeinsane.com:5214/singleframe.jpg?cam=5?1164990'})
                ]),
            ])
        ]),
        page('Gallery', [
            widget('remoteImageWidget', 'remote-image-gallery1', { src: 'https://picsum.photos/1920/1080'})
        ]),
        page('Extra', [
            tabsWidget({ tabsVisible: true }, [
                page('Timers', [
                    widget('localTimerWidget', 'timer-1-minute', {title: '1 minut3'}),
                    widget('localTimerWidget', 'timer-2-minute', {title: '2 minutes'}),
                    widget('localTimerWidget', 'timer-5-minute', {title: '5 minutes'}),
                    widget('localTimerWidget', 'timer-10-minute', {title: '10 minutes'}),
                    widget('localTimerWidget', 'timer-20-minute', {title: '20 minutes'}),
                    widget('localTimerWidget', 'timer-30-minute', {title: '30 minutes'}),
                ]),
                page('Tools', [
                    widget('reloadWidget', 'nodev-reload-widget-1'),
                ]),
            ]),
        ]),
    ])

    const dashboard = {
        properties: {
            widgets: [
                sideBySideWidget([
                   leftSideTabs, 
                    rightSideTabs,
                ]),
                widget('dummyClockLabelWidget'),
                widget('localTimerWidgetSound'),
            ],
        }
    }

    return dashboard 
}())
