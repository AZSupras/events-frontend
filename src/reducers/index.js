import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import events                 from './events';
import cart                   from './cart';
import checkout               from './checkout';

export default combineReducers({
  events,
  cart,
  checkout,
  router: routerStateReducer
});
