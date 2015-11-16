import { createReducer }     from '../utils';
import { GET_EVENTS, GOT_EVENTS } from 'constants/event';

const initialState = {
  isFetching: false,
  results: [],
  meta: {},
  hasResults: false
};

export default createReducer(initialState, {
  [GET_EVENTS] : function(state, action){
    return {
      ...state,
      isFetching: true
    }
  },
  [GOT_EVENTS] : function(state, action){
    return {
      ...state,
      isFetching: false,
      results: action.results,
      meta: action.meta,
      hasResults: (action.results.length > 0) ? true : false
    };
  }
});
