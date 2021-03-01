Unsorted and unedited braindump of todos/ideas:  

- cleanup unused dependencies 
- how to deal with "local" customized setup - stored in different directory (ignored by git) and use env var?
- better logo 
- is the startup sequence done in proper places? (loading devices, connectors, widgets wtc)
- functions in config javascript are copied from file to file (use common utils instead?)
- constructing object by class name (e.g. widgetsFactory) - is there a better way other than 
manually maintaining a list of available classes (i.e. automatically support all devices/widgets/connectors added in  certain folders)
- widgetUiCommons: change fixed sizes into rem 


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
  - configurable icons for sources 
  - better concept of "subdevices" (when source uses more than one device)
  - do sources / converters and classifiers  really need to be devices? maybe a separate storage for them ?
- improve usage of css (styled-components) and cleanup "bridge" between styled-components and react / material-ui (theme etc)

- improve usage of svg icons (avoid hardcoding paths)

- remove unused code from initial generation of the react-app
