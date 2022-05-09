import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const theme = unstable_createMuiStrictModeTheme(themeOptions);

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider>
    <CssBaseline />
    <ThemeProvider theme={theme}><App /></ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
