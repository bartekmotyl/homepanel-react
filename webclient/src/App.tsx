import React from 'react';
import logo from './logo.svg';
import { useDispatch } from 'react-redux';
import { registerDevice, } from './devices/devicesSlice';
import { hphWsConnect } from './middleware/hpHeadless/hphWebsocket';
import { TemperatureWidget } from './widgets/TemperatureWidget';
import './App.css';
import { XiaomiTemperatureSensor } from './devices/implementations/homepanel/XiaomiTemperatureSensor';

function App() {
  const dispatch = useDispatch();

  const initialize = () => {
    dispatch(registerDevice(new XiaomiTemperatureSensor('homepanel/ble-sensor-4c65a8df7d03')));    
    dispatch(hphWsConnect("ws://192.168.1.111:8899"));    
  }  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => initialize()}>Initialize</button>        
        <TemperatureWidget deviceId="homepanel/ble-sensor-4c65a8df7d03"  />
      </header>
    </div>
  );
}

export default App;
