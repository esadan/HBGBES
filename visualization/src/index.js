import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './assets/App.css';
import Root from './Root';


const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#006ec4',
            contrastText: '#fff',
        },
        secondary: {
            main: '#24c40e',
            contrastText: '#000',
        },
    },
});


class App extends Component {
    render() {
      return (        
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Root />
        </MuiThemeProvider>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
