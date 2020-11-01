import React from 'react';
import './App.css';
import { GlobalStyle } from './styles/global-styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ContainerWidget } from './widgets/containers/ContainerWidget';
import { dashboardConfig } from './dashboard/dashboardConfig';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#383C45",
    },
    secondary: {
      main: "#AEDC84",
    },
  },
});


function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />                
      <header className="App-header">
        <ThemeProvider theme={theme}>        
          <ContainerWidget props={dashboardConfig.properties}/> 
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;

