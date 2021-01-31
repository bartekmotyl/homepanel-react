Configuration 
- Widget title is not used (device name is shown instead?)



- review all classes and fix formatting (4 tabs)
- private properties in classes 
- use properties instead of getters?





- how to deal with unavailability of a device (data)? should it be covered by connector or rather 
  by device (i.e. inside of hp-react? )
- connectors: reconnect when necessary 
- widgets: do not fail when device not available/incorrect data 
- simple indicator widget: 
  - make classifiers configurable (including colors?)
  - cleanup type handling in sources / converters and classifiers 
  - make sources more generic (e.g. PowerMeterIndicatorWidgetSource)
  - configurable icons for sources 
  - better concept of "subdevices" (when source uses more than one device)
  - do sources / converters and classifiers  really need to be devices? maybe a separate storage for them ?
- improve usage of css (styled-components) and cleanup "bridge" between styled-components and react / material-ui (theme etc)

- improve usage of svg icons (avoid hardcoding paths)

- remove unused code from initial generation of the react-app
