import { createReducer }     from '../utils';
import { GET_EVENT, GOT_EVENT, GET_EVENTS, GOT_EVENTS } from 'constants/event';

const initialState = {
  isFetching: false,
  results: [],
  result: {},
  meta: {},
  hasResults: false
};

export default createReducer(initialState, {
  [GET_EVENT]  : function (state, action) {
    return {
      ...state,
      isFetching: true
    };
  },
  [GOT_EVENT]  : function (state, action) {
    return {
      ...state,
      isFetching: false,
      result: action.result,
      hasResults: action.hasResults
    };
  },
  [GET_EVENTS] : function (state, action) {
    return {
      ...state,
      isFetching: true
    };
  },
  [GOT_EVENTS] : function (state, action) {
    return {
      ...state,
      isFetching: false,
      results: action.results, // this could be an array OR object depending on meta
      meta: action.meta,
      hasResults: action.hasResults
    };
  }
});
