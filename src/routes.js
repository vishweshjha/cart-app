import React from 'react';
import { Route, Redirect } from 'react-router';
import {browserHistory,HashRouter} from 'react-router-dom';
import ListingPage from './Containers/ListingPage';
import Checkout from './Containers/CheckoutPage';

export default (
  <HashRouter>
    <Route path='/home' component={ListingPage} />
    <Route path='/checkout' component={Checkout} />
    <Redirect path='*' to='/home' />
  </HashRouter>
);
