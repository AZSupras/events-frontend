import axios from 'axios';

import { API_URL } from 'constants/app';
import { GET_EVENTS, GOT_EVENTS } from 'constants/event';

export default {
  fetchEvents: function(params) {
    return dispatch => {
      dispatch({ type : GET_EVENTS });
      params = Object.assign({}, { sort: 'startDate DESC', limit: 30 }, params);
      const url = (params.id) ? API_URL + '/event/' + params.id : API_URL + '/event';
      console.log(params);
      axios.get(url, { params: params })
      .then((response) => {
        dispatch({
          type: GOT_EVENTS,
          payload: {
            results: response.data.results,
            meta: response.data.meta
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
};
