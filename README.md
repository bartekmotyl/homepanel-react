# What is homepanel-react?

Homepanel-react is general purpose UI solution focused on home automation. 
It is Typescript, React based web application tuned to be able to run 24/7 on different types of displays, including tablets 
(e.g. on a wall). Homepanel-react is able to integrate different system into one, consistent UI.  
Homepanel-react is an open architecture with many extension points allowing to add custom modules and components.

# Demo & screenshots 

![Homepanel react - demo 1](/webclient/doc/screenshots/hpr-demo1.png)
![Homepanel react - demo 2](/webclient/doc/screenshots/hpr-demo2.png)

Click here to see [more screenshots](/webclient/doc/screenshots/)

You can also run demo yourself - please refer to [Demo](#Demo) section below. 

# Why yet another system?

Why to implement own system whilst there are existing systems doing the same (for example [openhab](https://www.openhab.org/), [home assistant](https://www.home-assistant.io/) etc.)? 

Well, the reasons for writing own solution were mainly historical (see more in [History](#History)). A main deciding factor was also an opportunity to learn new language (TypeScript) and technologies (React/Redux). 


# What homepanel-react can do?
Homepanel-react can integrate (connect) various systems (e.g. home automation systems, but not only) into one homogenous setup and presents data (live) in a nice UI. Main concept of homepanel-react is a 'device' which is an abstraction representing some external device (which can be basically anything). State of the device can be presented in the UI as well as it can be modified.

Among others, homepanel-react can already do following:
- show status of lights, control lights status 
- show temperatures 
- control blinds (shutters)
- show state of window/door sensors (open/closed)
- show current values of power/water/gas meters 
- arrange widgets in tabs (even nested) to make user experience better on touch devices (e.g. tablet on a wall)
- render floor plans (svg) with active elements on top (e.g. lights, temperatures, blinds etc.)
- embed external pages as widgets (using iframes) - for example [volumio](https://volumio.org/)  or any other page)
- show picture from given url (e.g. web/security camera, gallery etc.)


# Architecture of homepanel-react

Homepanel-react is built on top od the following concepts: 
- Connectors
- Devices and their interfaces 
- Widgets  

## Connectors

Connectors act as bridges between homepanel-react and external system that is being integrated. Responsibility of a connector is to pull data from external system into homepanel-react and to push data when user (or automation) performs any action that needs to be executed in the remote system (e.g. switch light). Simple connectors are one-way (pull only), more complicated can be two-way. 

Simplest example of a connector is a module that periodically fetches temperature from weather-forecast page (or API) and makes it available in homepanel-react.  

More complex example can be [FHEM](https://fhem.de/) connector that exposes FHEM devices in homepanel-react.

Connectors are implemented as Redux middlewares and it is possible to write own connectors easily. 

Due o historical reasons, the first implemented connector was homepanel-headless - more about this [History](#History) section. 

## Devices
Device is a core concept in homepanel-react. It is an abstraction of some external device (e.g. thermometer in Paris or bedroom light). Devices have state (kept in Redux state) which is updated by connectors. User actions can change state of device, but not directly - usually user action is send (by connector) to external system and once external system executes the action, changed state is pulled by connector to homepanel-react.   

It is also possible to implement *not-connected* devices, which hold a local state (not updated by any connector)

## Interfaces

Various devices are implemented and many more can be easily implemented. Implementations are usually tightly coupled to the actual entity in the external system. In order to access and manipulate devices in a more generic way, there is a set of interfaces that devices can expose, defining their fine-grained capabilities. For example, a device representing humidity and temperature sensor can implement two interfaces - Humidity and Temperature so can be used with corresponding widgets that require such capabilities (see below)


## Widgets
Widgets are UI elements that display data and allow to execute actions. A widget is usually bound to a given device (or devices) but does not access it directly, but rather via interfaces (see above). 

For example, a simple temperature widget can to be used with device that implements Temperature interface. But of course it does not mean device has to only implement this one interface.     

There are also widgets that are not connected to any device. They are mainly use to group other widgets (e.g. in tabs or panels) but can also be used to implement widgets that do not require any external data (e.g. a simple label that renders current time) 

# Configuration 

Configuration of homepanel-react is stored in .js files (part of deployment), loaded and evaluated on the fly.
This means there is no need to recompile/redeploy the application to change configuration. 

# Roadmap

I use homepanel-react on daily basis, 24/7 at my home and it works fine (10" android tablet with [Fully Kiosk Browser](https://play.google.com/store/apps/details?id=de.ozerov.fully)). But it does not mean the work is done - it is far from that :)  I already have a lots of ideas how to improve/extend homepanel-react and I am sure others would have their own as well. 

Some examples: 
- New connectors (e.g. to support generic WiFi switches like Sonos or NodeMCU)
- Improve UI & UX - I am not a designer, so widgets are not that pretty, I am aware of that :)
- Improve performance of floor plan widgets (the app becomes significantly slow on a tablet when floor plan widget is activated)
- Cleanup the code 
- Resolve CORS issues 

See more in reported tickets.   

# History
The whole *homepanel* story started when I installed in my house some elements of home automation based on [Loxone](https://www.loxone.com) and [Homematic](https://www.eq-3.com/products/homematic.html) controlled by [FHEM](https://fhem.de/). As these were separate systems there was no simple way to integrate them in a nice UI, preferably touch enabled. I wanted to have a dashboard (panel) with active elements to control devices from these systems in a unified way. 
At that time home-automation solutions that used touch panels were extremely expensive.
On the other hand, simple android tablets were relatively cheap, so I decided to write my own solution as an android app with help of [libgdx](https://libgdx.badlogicgames.com/). The app was written in java and also used connectors, devices and widgets. 

There was a slight problem though. I wanted to have a solution to monitor state of devices (e.g. lights turned on too long) or be able to automate some actions (e.g. move blinds down at given time). Doing this in android application seemed a bit unreliable. 
That's why I have decided to implement a separate java-based service (sharing code with android app i.e. connectors and devices) that can be run on any machine (e.g. linux server).
This is how *homepanel-headless* started. Using the same connectors and device implementations as in android app, homepanel-headless exposed possibility to write scripts that react to changes of devices state or proactively monitor it.  


The android app (UI) worked, and still works, pretty well with lots of features implemented over the years. But there are also downsides of android app: 
- Compatibility issues with different versions of android 
- Development cycle is pretty long. Although libgdx allows to test code on desktop, there were many cases when application proven to work on desktop was not running fine once deployed on tablet.
- Every change to configuration requires recompilation/redeployment  


To address these issues I decided to write homepanel-react - a webapp version of homepanel app. As I already had homepanel-headless running (covering all devices I need), I just exposed everything via websocket interface to be consumed by a connector in homepanel-react.

## Demo 

Starting a demo is a bit complicated because it requires an external system (FHEM) to connect to. 
The following needs to be done: 
- In `mock/fhem` folder run `docker-compose up` (docker required). This should start the docker container with FHEM with `fhem` folder mapped into the container. 
- Stop the running container and copy `fhem.cfg` file into the mapped folder (overwrite the file in there)
- Start container again via `docker-compose up`
- Open http://localhost:8083/fhem - a simple FHEM web interface 
- Start homepanel-react by `yarn run start` in the `webclient` folder 
- Open homepanel-react - http://localhost:3000 
- The default configuration of homepanel-react uses FHEM connector that connects to FHEM inside the docker container. 
- Make some changes in the FHEM web interface and monitor how the changes are automatically reflected in  homepanel-react. 
- Some values (e.g. temperatures) are randomly changed by a timer - note how the values change in homepanel-react automatically. 

## License 

GNU GENERAL PUBLIC LICENSE
