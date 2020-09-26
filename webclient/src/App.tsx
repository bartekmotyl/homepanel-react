import React from 'react';
import './App.css';
import { DashboardTest } from './dashboard/DashboardTest';
import { GlobalStyle } from './styles/global-styles';



function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        <DashboardTest />
      </header>
    </div>
  );
}

export default App;
