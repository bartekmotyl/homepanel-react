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
    const floorPlanElementLocation = (x, y, width, height) => {
        return {
            x, 
            y, 
            width, 
            height, 
        }        
    }

    const floorPlanTemperature = (rect, deviceId, converterId, classifierId) => {
        return {
            rect, 
            deviceId, 
            converterId, 
            classifierId,
        }
    }

    const floorPlanWidget = (src, temperatures, props) => {
        return {
            "type": 'floorPlanWidget',
            "properties": {
                ...props,
                "src": src,
                "temperatures": temperatures,
            }
        }
    }

    const floorPlanTemperatureSimpleSensor = (device, x, y, classifier, converter) => {
        return floorPlanTemperature(
            floorPlanElementLocation(x, y, 0.05, 0.05),
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
                floorPlanTemperatureSimpleSensor('owire-sensor-cwu-zasilanie', 0.268, 0.132, 
                    'heatwater-temperature-classifier', 'composite-value-to-temperature'), // CWU zasilanie
                floorPlanTemperatureSimpleSensor('owire-sensor-co-zasilanie', 0.268, 0.210, 
                    'heatwater-temperature-classifier', 'composite-value-to-temperature'), // CO zasilanie
                floorPlanTemperatureSimpleSensor('ble-sensor-4c65a8df7d03', 0.536, 0.259), // Salon
                floorPlanTemperatureSimpleSensor('ble-sensor-582d34364ee7', 0.155, 0.733), // Garaż
                floorPlanTemperatureSimpleSensor('ble-sensor-4c65a8df6a72', 0.718, 0.558), // Jadalnia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21ca1', 0.402, 0.764), // Wiatrołap
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21bb7', 0.565, 0.801), // Łazienka parter
                floorPlanTemperatureSimpleSensor('ble-sensor-582d34364f04', 0.057, 0.188), // Drukarka 3D
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21b0a', 0.162, 0.265), // Kotłownia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21c10', 0.365, 0.530), // Serwerownia
                floorPlanTemperatureSimpleSensor('ble-sensor-00126fc21c3e', 0.774, 0.904), // Na dworze
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
