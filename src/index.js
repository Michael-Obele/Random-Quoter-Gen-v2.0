import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { debugContextDevtool } from 'react-context-devtool';
import './index.css';
import App from './App';

const container = document.getElementById('root');

ReactDOM.render(<App />, container);

// Attach root container to the DOM
debugContextDevtool(container, true);
