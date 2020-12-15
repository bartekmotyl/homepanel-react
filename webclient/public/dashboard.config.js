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
        /*
        page('Parter Plan', [
            widget('remoteImageWidget', 'remote-image-gallery', { src: 'floor-plan-parter.svg'})
        ]),
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
                ])
            ],
        }
    }

    return dashboard 
}())
