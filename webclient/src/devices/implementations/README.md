This folder contains device implementation i.e. classes that implement interfaces from devices/interfaces
(and consume data from devicesSlice, exposed there by middlewares aka connectors). 

Folder 'generic' contains device implementations that make use of data in some common 
form i.e. expected to be provided by more than one middleware (connector).
Please note that it is perectly fine a device implementation makes use only of 
a slice of data provided by middleware.

On the other hand, folder 'custom' contains device implementations that use some dedicated data structures, 
returned only by dedicated middlewares.   