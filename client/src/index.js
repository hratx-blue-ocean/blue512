import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { yellow, red, blue } from '@material-ui/core/colors';

//Set global theme here
const theme = createMuiTheme({
  palette: {
    // primary: yellow

    primary: {
      // light: "#7986cb",
      main: "#ff1744",
      // dark: "#303f9f",
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