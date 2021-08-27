import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { NativeBaseProvider, Box } from 'native-base';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NativeBaseProvider>

        <App />
      </NativeBaseProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

