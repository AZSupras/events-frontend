import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import EventView             from 'views/EventView';
import CheckoutView          from 'views/CheckoutView';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/event/:id' component={EventView} />
    <Route path='/checkout' component={CheckoutView} />
  </Route>
);
