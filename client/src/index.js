import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { yellow, red, blue, purple, deepPurple } from '@material-ui/core/colors';

//Set global theme here (WIP)
const theme = createMuiTheme({
  palette: {
    primary: blue,

    secondary: {
      // light:,
      main: "#ff5252",
      // dark: 
    },
    background: {
      paper: "#fff",
      default: "#fafafa"
      // default: "#ffde03"
    }
  },
});


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'));