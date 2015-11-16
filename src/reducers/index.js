import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import event                from './event';

export default combineReducers({
  event,
  router: routerStateReducer
});
