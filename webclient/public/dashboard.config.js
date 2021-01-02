(function() {
    const siWidget = (deviceId, classifierId) => { 
        return {
            "type": "smallIndicatorWidget",
            "properties": {
                "deviceId": deviceId,
                "classifierId": classifierId,
            }
        }
    }

    const tickerWidget = (width, widgets) => {
        return {
            "type": "tickerWidget",
            "properties": {
                "width": width,
                "widgets": widgets,
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

    const sideBySideWidget = (widgets) => {
        return {
            "type": "sideBySideWidget",
            "properties": {
              "widgets": widgets,
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

    const page = (title, widgets) => {
        return {
            "title": title,
            "widgets": [
                widgets.length === 1 ? widgets[0] : panelWidget(widgets)
            ]
        }        
    }

    const widget = (type, id, props) =>  {
        return {
            "type": type,
            "properties": {
                ...props,                
                "deviceId": id
            }
        }
    }

    const floorPlanElementLocation = (x, y) => {
        return {
            x, 
            y, 
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
            classifier ?? 'indoor-temperature-classifier',
        )
    } 

    const floorPlanLight = (deviceId, x, y, switchable) => {
        return {
            location: floorPlanElementLocation(x, y),
            deviceId, 
            switchable, 
        }
    }    

    const leftSideTabs = tabsWidget({ width: "22rem", tabsVisible: true }, [
        page('Główne', [
            siWidget('power-meter-source', 'power-meter-classifier-minute'),
            siWidget('water-meter-main-source'),
            siWidget('water-meter-garden-source'),
            siWidget('brama-garazowa-door-source'),
            siWidget('brama-ogrodzenia-door-source'),
            siWidget('pings-essentail-source'),             
            siWidget('ble-sensor-00126fc21c3e-source-temperature', 'outdoor-temperature-classifier'),             
            siWidget('heating-status-source'),             
            siWidget('owire-sensor-co-zasilanie-as-temperature', 'heatwater-temperature-classifier'),            
            siWidget('pmsensor-25-source-number', 'pmsensor-25-value-classifier'),             
            siWidget('pmsensor-10-source-number', 'pmsensor-10-value-classifier'),    
            siWidget('kontaktron-lazienka-pietro-okno-door-source'),
            siWidget('kontaktron-sypialnia-okno-door-source'),
            siWidget('kontaktron-nina-okno-door-source'),
            siWidget('kontaktron-goscinny-okno-door-source'),
            siWidget('kontaktron-gabinet-okno-door-source'),
            siWidget('kontaktron-gabinet-okno-polaciowe-door-source'),
            siWidget('kontaktron-garderoba-okno-polaciowe-door-source'),
        ]),
        page('Temperatury', [
            siWidget('owire-sensor-co-zasilanie-as-temperature', 'heatwater-temperature-classifier'),            
            siWidget('owire-sensor-co-powrot-gora-as-temperature', 'heatwater-temperature-classifier'),            
            siWidget('owire-sensor-co-powrot-dol-as-temperature', 'heatwater-temperature-classifier'),            
            siWidget('owire-sensor-co-powrot-as-temperature', 'heatwater-temperature-classifier'),            
            siWidget('owire-sensor-cwu-zasilanie-as-temperature', 'heatwater-temperature-classifier'),            
            siWidget('owire-sensor-cwu-powrot-as-temperature', 'heatwater-temperature-classifier'),            
        ]),
        page('Pingi', [
            siWidget('pings-bartek-galaxy-source'),             
        ]),

    ])
    const rightSideTabs = tabsWidget({ width: "calc(100vw - 23rem)", tabsVisible: true }, [
        page('Parter', [
            widget('blindsWidget', 'roleta-salon-lewa'),
            widget('blindsWidget', 'roleta-salon-prawa'),
            widget('blindsWidget', 'rolety-grupa-salon'),
            widget('blindsWidget', 'rolety-grupa-parter'),
        ]),
        page('Piętro', [
            widget('blindsWidget', 'rolety-grupa-pietro-okna-sypialnie'),
        ]),
        page('Parter Plan', [
            floorPlanWidget('floor-plan-parter.svg', [
                floorPlanTemperatureSimpleSensor('owire-sensor-cwu-zasilanie', 0.228, 0.112, 
                    'heatwater-temperature-classifier', 'composite-value-to-temperature'), // CWU zasilanie
                floorPlanTemperatureSimpleSensor('owire-sensor-co-zasilanie', 0.228, 0.190, 
                    'heatwater-temperature-classifier', 'composite-value-to-temperature'), // CO zasilanie
                floorPlanTemperatureSimpleSensor('ble-sensor-4c65a8df7d03', 0.516, 0.239), // Salon
                floorPlanTemperatureSimpleSensor('ble-sensor-582d34364ee7', 0.135, 0.713), // Garaż
                floorPlanTemperatureSimpleSensor('ble-sensor-4c65a8df6a72', 0.698, 0.538), // Jadalnia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21ca1', 0.382, 0.724), // Wiatrołap
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21bb7', 0.570, 0.800), // Łazienka parter
                floorPlanTemperatureSimpleSensor('ble-sensor-582d34364f04', 0.037, 0.168), // Drukarka 3D
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21b0a', 0.142, 0.245), // Kotłownia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21c10', 0.345, 0.510), // Serwerownia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21c3e', 0.754, 0.884), // Na dworze
            ], [
                floorPlanBlinds('roleta-salon-lewa', 0.430, 0.039, ['rolety-salon', 'rolety-parter']),
                floorPlanBlinds('roleta-salon-prawa', 0.610, 0.039, ['rolety-salon', 'rolety-parter']),
                floorPlanBlinds('roleta-kuchnia', 0.755, 0.733, ['rolety-jadalnia-i-kuchnia', 'rolety-kuchnia-i-jadalnia-plus-drzwi', 'rolety-parter']),
                floorPlanBlinds('roleta-jadalnia-lewa', 0.800, 0.330, ['rolety-jadalnia', 'rolety-jadalnia-i-kuchnia', 'rolety-kuchnia-i-jadalnia-plus-drzwi', 'rolety-parter', ]),
                floorPlanBlinds('roleta-jadalnia-prawa', 0.800, 0.450, ['rolety-jadalnia', 'rolety-jadalnia-i-kuchnia', 'rolety-kuchnia-i-jadalnia-plus-drzwi', 'rolety-parter']),
                floorPlanBlinds('roleta-jadalnia-drzwi', 0.823, 0.150, ['rolety-kuchnia-i-jadalnia-plus-drzwi', 'rolety-parter']),
            ], [
                floorPlanLight('wiatrolap-lampa', 0.389, 0.648, true),
                floorPlanLight('salon-led', 0.360, 0.055, true),
                floorPlanLight('salon-kinkiety', 0.361, 0.332, true),
                floorPlanLight('hall-parter-lampa', 0.518, 0.471, true),
                floorPlanLight('hall-parter-kinkiet', 0.576, 0.559, true),
                floorPlanLight('salon-kominek', 0.619, 0.341, true),
                floorPlanLight('salon-tv', 0.722, 0.166, true),
                floorPlanLight('salon-halogeny-okno', 0.518, 0.135, true),
                floorPlanLight('salon-halogeny-tyl', 0.399, 0.197, true),
                floorPlanLight('jadalnia-lampa', 0.720, 0.401, true),
                floorPlanLight('kuchnia-lampa', 0.778, 0.636, true),
                floorPlanLight('kuchnia-kinkiet', 0.883, 0.627, true),

                floorPlanLight('lazienka-parter-lustro', 0.514, 0.760, true),
                floorPlanLight('lazienka-parter-sufit', 0.580, 0.745, true),
                
                

                floorPlanLight('schody-lampa', 0.348, 0.445, true),
                floorPlanLight('garaz-lampa', 0.157, 0.542, true),
                
                
            ])
        ]),
        /*
        */
        page('Inne', [
            tabsWidget({ tabsVisible: true }, [
                page('Timery', [
                    widget('localTimerWidget', 'timer-1-minute', {title: '1 minuta'}),
                    widget('localTimerWidget', 'timer-2-minute', {title: '2 minuty'}),
                    widget('localTimerWidget', 'timer-3-minute', {title: '3 minuty'}),
                    widget('localTimerWidget', 'timer-4-minute', {title: '4 minuty'}),
                    widget('localTimerWidget', 'timer-5-minute', {title: '5 minut'}),
                    widget('localTimerWidget', 'timer-8-minute', {title: '8 minut'}),
                    widget('localTimerWidget', 'timer-9-minute', {title: '9 minut'}),
                    widget('localTimerWidget', 'timer-10-minute', {title: '10 minut'}),
                    widget('localTimerWidget', 'timer-10a-minute', {title: '10 minut'}),
                    widget('localTimerWidget', 'timer-12-minute', {title: '12 minut'}),
                    widget('localTimerWidget', 'timer-15-minute', {title: '15 minut'}),
                    widget('localTimerWidget', 'timer-20-minute', {title: '20 minut'}),
                    widget('localTimerWidget', 'timer-30-minute', {title: '30 minut'}),
                    widget('localTimerWidget', 'timer-60-minute', {title: '60 minut'}),
                    widget('localTimerWidget', 'timer-90-minute', {title: '90 minut'}),
                    widget('localTimerWidget', 'timer-120-minute', {title: '120 minut'}),
                    widget('localTimerWidget', 'timer-180-minute', {title: '190 minut'}),
                ]),
                page('Narzędzia', [
                    widget('reloadWidget', 'nodev-reload-widget-1'),
                ]),
              
                page('Kamery', [
                    tabsWidget({ tabsVisible: true }, [
                        page('Ulica', [
                            widget('remoteImageWidget', 'remote-image-gallery', { src: 'http://192.168.55.103/tmpfs/snap.jpg?usr=admin&pwd=admin'})
                        ]),
                        page('Ogródek', [
                            widget('remoteImageWidget', 'remote-image-gallery', { src: 'http://192.168.55.102/tmpfs/snap.jpg?usr=admin&pwd=admin'})
                        ]),
                        page('Garaż', [
                            widget('remoteImageWidget', 'remote-image-gallery', { src: 'http://192.168.55.101/cgi-bin/snapshot.cgi?usr=admin&pwd=123456'})
                        ]),
                        page('Kotłownia', [
                            widget('remoteImageWidget', 'remote-image-gallery', { src: 'http://192.168.55.104/cgi-bin/snapshot.cgi?usr=admin&pwd=123456'})
                        ]),
                        page('Domek', [
                            widget('remoteImageWidget', 'remote-image-gallery', { src: 'http://192.168.1.54:8088/?action=snapshot'})
                        ]),
                    ]),        
                ]),  
            ]),            
        ]),
        page('Muzyka', [
            tabsWidget({ tabsVisible: true }, [
                page('Kuchnia', [
                    widget('iframeWidget', 'nodev-volumio-kuchnia-iframe', { url: 'http://192.168.1.59'}),
                ]),
            ])
        ]),
        page('Galeria', [
            widget('remoteImageWidget', 'nodev-remote-image-gallery', { src: 'http://192.168.1.111/bartek/photo-feed/photo-feed.php'})
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
