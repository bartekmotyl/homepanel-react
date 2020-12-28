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
    const floorPlanElementRect = (x, y, width, height) => {
        return {
            x, 
            y, 
            width, 
            height, 
        }        
    }

    const floorPlanElementLocation = (x, y) => {
        return {
            x, 
            y, 
        }        
    }

    const floorPlanWidget = (src, temperatures, blinds) => {
        return {
            "type": 'floorPlanWidget',
            "properties": {
                "src": src,
                "temperatures": temperatures,
                'blinds': blinds,  
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
        page('Galeria', [
            widget('remoteImageWidget', 'remote-image-gallery', { src: 'http://192.168.1.111/bartek/photo-feed/photo-feed.php'})
        ]),        
        page('Parter Plan', [
            floorPlanWidget('floor-plan-parter.svg', [
                floorPlanTemperatureSimpleSensor('owire-sensor-cwu-zasilanie', 0.248, 0.112, 
                    'heatwater-temperature-classifier', 'composite-value-to-temperature'), // CWU zasilanie
                floorPlanTemperatureSimpleSensor('owire-sensor-co-zasilanie', 0.248, 0.190, 
                    'heatwater-temperature-classifier', 'composite-value-to-temperature'), // CO zasilanie
                floorPlanTemperatureSimpleSensor('ble-sensor-4c65a8df7d03', 0.516, 0.239), // Salon
                floorPlanTemperatureSimpleSensor('ble-sensor-582d34364ee7', 0.135, 0.713), // Garaż
                floorPlanTemperatureSimpleSensor('ble-sensor-4c65a8df6a72', 0.698, 0.538), // Jadalnia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21ca1', 0.382, 0.724), // Wiatrołap
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21bb7', 0.545, 0.781), // Łazienka parter
                floorPlanTemperatureSimpleSensor('ble-sensor-582d34364f04', 0.037, 0.168), // Drukarka 3D
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21b0a', 0.142, 0.245), // Kotłownia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21c10', 0.345, 0.510), // Serwerownia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21c3e', 0.754, 0.884), // Na dworze
            ], [
                floorPlanBlinds('roleta-salon-lewa', 0.537, 0.039, ['rolety-salon', 'rolety-parter']),
                floorPlanBlinds('roleta-salon-prawa', 0.669, 0.039, ['rolety-salon', 'rolety-parter']),
                floorPlanBlinds('roleta-kuchnia', 0.790, 0.733, ['rolety-kuchnia-i-jadalnia', 'rolety-parter']),
                floorPlanBlinds('roleta-jadalnia-lewa', 0.849, 0.330, ['rolety-kuchnia-i-jadalnia', 'rolety-parter', 'rolety-jadalnia']),
                floorPlanBlinds('roleta-jadalnia-prawa', 0.849, 0.450, ['rolety-kuchnia-i-jadalnia', 'rolety-parter', 'rolety-jadalnia']),
                floorPlanBlinds('roleta-jadalnia-drzwi', 0.849, 0.172, ['rolety-kuchnia-i-jadalnia', 'rolety-parter']),
            ])
        ]),
        /*
        */
        page('Kamery', [
            tabsWidget({ width: "100%", tabsVisible: true }, [
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
    ])

    const dashboard = {
        properties: {
            widgets: [
                sideBySideWidget([
                   leftSideTabs, 
                    rightSideTabs,
                ]),
                widget('dummyClockLabelWidget')
            ],
        }
    }

    return dashboard 
}())
