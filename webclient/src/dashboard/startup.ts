import { store } from '../app/store';
import { registerDevice } from '../devices/devicesSlice';
import { XiaomiTemperatureSensor } from '../devices/implementations/custom/homepanel/XiaomiTemperatureSensor';
import { SwitchDevice } from '../devices/implementations/generic/Switch';
import { TemperatureSensorDevice } from '../devices/implementations/generic/TemperatureSensor';
import { hpHeadlessConnect } from '../middleware/hpHeadless/hpHeadlessMiddleware';
import { mockConnect } from '../middleware/mock/mockMiddleware';
import { hphWebSocketMiddlewareFunction } from '../middleware/hpHeadless/hpHeadlessMiddleware';
import { mockMiddlewareFunction } from '../middleware/mock/mockMiddleware';
import { metNoMiddlewareFunction } from '../middleware/metNo/metNoMiddleware';
import { TemperatureWidget } from '../widgets/TemperatureWidget';
import { SwitchWidget } from '../widgets/SwitchWidget';
import { BlindsDevice } from '../devices/implementations/generic/Blinds';
import { CompositeValueDevice } from '../devices/implementations/generic/CompositeValueDevice';
import { registerElement } from '../registry/registrySlice';
import { SimpleValueDevice } from '../devices/implementations/generic/SimpleValueDevice';
import { CompositeValueAsTemperatureConverter } from '../registry/converters/CompositeValueAsTemperatureConverter';
import { TemperatureIndicatorWidgetSource } from '../registry/indicators/TemperatureIndicatorWidgetSource';
import { IndoorTemperatureValueClassifier } from '../registry/classifiers/IndoorTemperatureValueClassifier';
import { PowerMeterIndicatorWidgetSource } from '../registry/indicators/PowerMeterIndicatorWidgetSource';
import { PowerMeterValueClassifier } from '../registry/classifiers/PowerMeterValueClassifier';

export const connectorMiddlewares = [
    hphWebSocketMiddlewareFunction('homepanel'), 
    mockMiddlewareFunction('mock-1'),
    metNoMiddlewareFunction('met-no-1'),
];

export const configureDevices = () => {
    store.dispatch(registerDevice(new XiaomiTemperatureSensor('homepanel', 'ble-sensor-4c65a8df7d03', 'Living room')));
    store.dispatch(registerDevice(new SwitchDevice('homepanel', 'wiatrolap-lampa', 'Wiatrołap')));
    store.dispatch(registerDevice(new BlindsDevice('homepanel', 'roleta-salon-lewa', 'Roleta - Salon L')));
    store.dispatch(registerDevice(new CompositeValueDevice('homepanel', 'onewire-sensor-grunt-0', 'Grunt 0cm')));  
    store.dispatch(registerDevice(new CompositeValueDevice('homepanel', 'ble-sensor-00126fc21c10', 'Serwerownia')));  
    store.dispatch(registerDevice(new CompositeValueDevice('homepanel', 'ble-sensor-00126f6d3a29', 'Prąd')));  
    
    store.dispatch(registerDevice(new SimpleValueDevice('homepanel', 'water-meter-main-value', 'Wodomierz')));    
    store.dispatch(registerDevice(new TemperatureSensorDevice('mock-1', 'mock-temperature-1', 'Mock 1')));    
    store.dispatch(registerDevice(new TemperatureSensorDevice('met-no-1', 'met-no-wroclaw-temperature', 'Wrocław')));    
    
    store.dispatch(registerElement(new CompositeValueAsTemperatureConverter('composite-value-to-temperature', 'temperature')))
    store.dispatch(registerElement(new TemperatureIndicatorWidgetSource('onewire-sensor-grunt-0-source-temperature',
        'Grunt 0', 'onewire-sensor-grunt-0', 'composite-value-to-temperature')))
    store.dispatch(registerElement(new TemperatureIndicatorWidgetSource('ble-sensor-00126fc21c10-source-temperature', 
        'Serwerownia','ble-sensor-00126fc21c10', 'composite-value-to-temperature')))
    store.dispatch(registerElement(new PowerMeterIndicatorWidgetSource('power-meter-source', 'Prąd', 'ble-sensor-00126f6d3a29')))

 
    store.dispatch(registerElement(new IndoorTemperatureValueClassifier('indoor-temperature-classifier')))
    store.dispatch(registerElement(new PowerMeterValueClassifier('power-meter-classifier-minute', 60.0)))
 
    store.dispatch(hpHeadlessConnect('homepanel', 'ws://192.168.1.111:8899'));    
    store.dispatch(mockConnect('mock-1'));    
    store.dispatch(mockConnect('met-no-1'));    
}
export const registeredWidgets = {
    'temperatureWidget': TemperatureWidget,
    'switchWidget': SwitchWidget,
}
