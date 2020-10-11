import React from 'react';
import './App.css';
import { DashboardTest } from './dashboard/DashboardTest';
import { GlobalStyle } from './styles/global-styles';
import { Helmet } from "react-helmet";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
      <Helmet>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />                
      </Helmet>
      <header className="App-header">
        <ThemeProvider theme={theme}>        
          <DashboardTest />
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
