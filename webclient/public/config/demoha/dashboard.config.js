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


    const floorPlanWidget = (src, temperatures, blinds, lights) => {
        return {
            'type': 'floorPlanWidget',
            'properties': {
                'src': src,
                'temperatures': temperatures,
                'blinds': blinds,  
                'lights': lights,
            }
        }
    }

    const floorPlanElementLocation = (x, y) => {
        return {
            x, 
            y, 
        }        
    }

    const floorPlanTemperature = (location, deviceId, converterId, classifierId) => {
        return {
            location, 
            deviceId, 
            converterId, 
            classifierId,
        }
    }

    const floorPlanBlinds = (deviceId, x, y, groups, ) => {
        return {
            location: floorPlanElementLocation(x, y),
            deviceId, 
            groups, 
        }
    }

    const floorPlanTemperatureSimpleSensor = (device, x, y, classifier, converter) => {
        return floorPlanTemperature(
            floorPlanElementLocation(x, y),
            device, 
            converter,
            classifier ?? 'indoor-range-temperature-classifier',
        )
    } 

    const floorPlanLight = (deviceId, x, y, switchable) => {
        return {
            location: floorPlanElementLocation(x, y),
            deviceId, 
            switchable, 
        }
    }   
    
    const siWidget = (deviceId, classifierId) => { 
        return {
            "type": "smallIndicatorWidget",
            "properties": {
                "deviceId": deviceId,
                "classifierId": classifierId,
            }
        }
    }    

    const leftSideTabs = tabsWidget({ width: "22rem", tabsVisible: true }, [
        page('Main', [
            siWidget('sensor.power_consumption-source', 'power-meter-range-classifier-minute'),       
            siWidget('cover.kitchen_window-source'),  
            siWidget('cover.hall_window-source'),  
            siWidget('cover.living_room_window-source'),  
            siWidget('cover.garage_door-source'),  
            siWidget('cover.pergola_roof-source'),  
            //siWidget('PowerMeter-source', 'power-meter-range-classifier-minute'),                 
            //siWidget('WaterMeter-source', 'water-meter-range-value-classifier'),           
            //siWidget('sensor.lumi_lumi_sensor_ht_temperature-source', 'indoor-range-temperature-classifier')      
        ]),
        page('Temperatures', [
            siWidget('sensor.outside_temperature-source', 'outdoor-range-temperature-classifier'),            
            siWidget('tempBedroom-source', 'indoor-range-temperature-classifier'),            
        ]),
    ])
    const rightSideTabs = tabsWidget({ width: "calc(100vw - 23rem)", tabsVisible: true }, [
        /*
        page('1st Floor', [
            floorPlanWidget('floorplans/floor-plan-demo.svg', [
                floorPlanTemperatureSimpleSensor('tempOffice', 0.772, 0.693), 
                floorPlanTemperatureSimpleSensor('tempBedroom', 0.037, 0.318), 
                
            ], [
                floorPlanBlinds('blindsOffice', 0.800, 0.800, ['blinds-first-floor']),         
                floorPlanBlinds('blindsBedroom', 0.075, 0.095, ['blinds-first-floor']),         
            ], [
                floorPlanLight('lightOffice', 0.664, 0.812, true),
                floorPlanLight('lightBedroom', 0.145, 0.238, true),
            ])
        ]),
        */     
          
        page('Rooms', [
            tabsWidget({ tabsVisible: true }, [
                page('Bedroom', [
                    widget('switchWidget', 'light.bed_light', {title: 'Bed light'}),
                    widget('switchWidget', 'switch.decorative_lights', {title: 'Decorative'}),
                    
                    //widget('blindsWidget', 'blindsBedroom', {title: 'Bedroom'}),         
                    //widget('temperatureWidget', 'tempBedroom', {title: 'Bedroom'})           
                ]),
                /*
                page('Office', [
                    widget('switchWidget', 'lightOffice', {title: 'Office'}),
                    widget('blindsWidget', 'blindsOffice', {title: 'Office'}),         
                    widget('temperatureWidget', 'tempOffice', {title: 'Office'})           
                ]),
                */
            ]),
        ]),
        page('Charts', [
            tabsWidget({ tabsVisible: true }, [
                page('CERN', [
                    widget('iframeWidget', 'nodev-grafana-iframe2', { url: 'https://monit-grafana-open.cern.ch/d/000000288/lhcopn?viewPanel=3&orgId=16'}),
                ]),
                page('Wiki', [
                    widget('iframeWidget', 'nodev-grafana-iframe1', { url: 'https://grafana.wikimedia.org/d/000000208/edit-count?viewPanel=8&orgId=1&refresh=5m'}),
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
                    widget('localTimerWidget', 'timer-1-minute', {title: '1 minute'}),
                    widget('localTimerWidget', 'timer-2-minute', {title: '2 minutes'}),
                    widget('localTimerWidget', 'timer-5-minute', {title: '5 minutes'}),
                    widget('localTimerWidget', 'timer-10-minute', {title: '10 minutes'}),
                    widget('localTimerWidget', 'timer-20-minute', {title: '20 minutes'}),
                    widget('localTimerWidget', 'timer-30-minute', {title: '30 minutes'}),
                ]),
                page('Tools', [
                    widget('reloadWidget', 'nodev-reload-widget-1'),
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
