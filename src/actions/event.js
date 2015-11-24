import axios from 'axios';
import lodash from 'lodash';
import { GENERAL_ERROR } from 'constants/app';
import { GET_EVENT, GOT_EVENT, GET_EVENTS, GOT_EVENTS, NO_EVENT_DATA } from 'constants/event';

export default {
  fetchEvent: function (params) {
    return dispatch => {
      const compiledParams = Object.assign({}, { sort: 'startDate DESC', limit: 30 }, params);
      const url = CONFIG[process.env.NODE_ENV].API_URL + '/event/' + compiledParams.id;
      dispatch({ type : GET_EVENT, params: compiledParams, url });
      axios.get(url, { params: compiledParams })
      .then((response) => {
        const payload = {
          type: GOT_EVENT,
          payload: {
            result: response.data,
            hasResults: ( lodash.size(response) > 0 ) ? true : false
          }
        };
        dispatch(payload);
      })
      .catch((error) => {
        console.error(error);
      });
    };
  },

  fetchEvents: function (params) {
    return dispatch => {
      const compiledParams = Object.assign({}, { sort: 'startDate DESC', limit: 30 }, params);
      const url = (compiledParams.id) ? CONFIG[process.env.NODE_ENV].API_URL + '/event/' + compiledParams.id : CONFIG[process.env.NODE_ENV].API_URL + '/event';
      dispatch({ type : GET_EVENTS, params: compiledParams, url });
      axios.get(url, { params: compiledParams })
      .then((response) => {
        const hasResults = function (result) {
          if (typeof result === 'object') {
            return ( lodash.size(result) > 0 ) ? true : false;
          } else if (Array.isArray(result)) {
            return (result.length > 0) ? true : false;
          } else {
            return false;
          }
        };

        const payload = {
          type: GOT_EVENTS,
          payload: {
            results: ( lodash.has(params, 'id') ) ? response.data : response.data.results,
            meta: ( lodash.has(params, 'id') ) ? {} : response.data.meta,
            hasResults: ( lodash.has(params, 'id') ) ? hasResults(response.data) : hasResults(response.data.results)
          }
        };
        dispatch(payload);
      })
      .catch((error) => {
        dispatch({ type: GENERAL_ERROR, payload: { error } });
        dispatch({ type: NO_EVENT_DATA });
      });
    };
  }
};
