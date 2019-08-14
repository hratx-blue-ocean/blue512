import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

//Set global theme here
const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'));