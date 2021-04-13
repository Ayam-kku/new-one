import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';


const jsx = (
  <BrowserRouter forceRefresh={true}>
    <App />
  </BrowserRouter>
);

ReactDOM.render(jsx, document.getElementById('root'));
serviceWorker.unregister();
