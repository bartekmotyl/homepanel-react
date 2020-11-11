import React, { useEffect, useState } from 'react';
import './App.css';
import { GlobalStyle } from './styles/global-styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ContainerWidget } from './widgets/containers/ContainerWidget';
import { getDashboardConfig, minimalWidgetConfiguration } from './dashboard/dashboardConfig';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Configuration } from './configuration/Configuration';
import { WidgetConfiguration } from './widgets/widgets';
import useAsync from 'react-use/lib/useAsync';

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
  const state = useAsync(async () => {
    await new Promise(r => setTimeout(r, 1000))
    const dashboardConfig = await getDashboardConfig()
    return dashboardConfig
  }, [minimalWidgetConfiguration]);

  //const [config, setConfig] = useState<WidgetConfiguration|undefined>();
  /*useEffect(() => {
    if (!config) {
      getConfig()
    }
  });

  const getConfig = async () => {
    const dashboardConfig = await getDashboardConfig()
    setConfig(dashboardConfig);
  };
*/
  return (
    <div className="App">
      <GlobalStyle />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />                
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/config">
                <Configuration />
              </Route>
              <Route path="/">
                <ContainerWidget props={state.value?.properties ?? minimalWidgetConfiguration}/>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;

