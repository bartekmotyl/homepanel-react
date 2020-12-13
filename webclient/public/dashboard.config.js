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

    const panelWidget = (props, widgets) => {
        return {
            "type": "panelWidget",
            "properties": {
              ...props,
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
                panelWidget({height: "300px", "background-color": "inherit"}, widgets)
            ]
        }        
    }

    const widget = (type, id) =>  {
        return {
            "type": type,
            "properties": {
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
    const rightSideTabs = tabsWidget({ width: "calc(100vw - 30rem)", tabsVisible: true }, [
        page('Parter', [
            widget('blindsWidget', 'roleta-salon-lewa'),
            widget('blindsWidget', 'roleta-salon-prawa'),
            widget('blindsWidget', 'rolety-grupa-salon'),
                        
        ]),
        page('Piętro', [
            siWidget('pings-essentail-source'),             
        ]),
    ])
    /*
    const dashboard = {
        "type": "containerWidget",
        "properties": {
            "widgets": [
                panelWidget([
                    leftSideTabs, 
                    rightSideTabs,
                ])
            ]
        }
    }       
    */
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
