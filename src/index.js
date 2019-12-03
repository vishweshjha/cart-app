/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import routes from './routes';



ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        {routes}
     </HashRouter>
    </Provider>
  ), document.getElementById('root'),
);
