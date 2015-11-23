import lodash from 'lodash';
import { createReducer }     from '../utils';
import { STRIPE_GET_TOKEN, STRIPE_GOT_TOKEN, PAYMENT_PROCESS, PAYMENT_PROCESSED, PAYMENT_FAILED } from 'constants/checkout';

const initialState = {
  card: {},
  cart: {},
  token: null,
  isProcessing: false,
  isSuccessful: false,
  hasProcessed: false
};

export default createReducer(initialState, {
  [STRIPE_GET_TOKEN] : function (state, action) {
    return {
      ...state,
      ...action.checkout,
      cart: action.cart,
      isProcessing: true
    };
  },
  [STRIPE_GOT_TOKEN] : function (state, action) {
    return {
      ...state,
      card: {},
      isProcessing: true
    };
  },
  [PAYMENT_PROCESS] : function (state, action) {
    return {
      ...state
    }
  },
  [PAYMENT_PROCESSED] : function (state, action) {
    return {
      ...initialState,
      isProcessing: false,
      isSuccessful: true,
      hasProcessed: true
    };
  },
  [PAYMENT_FAILED] : function (state, action) {
    return {
      ...state,
      isProcessing: false,
      isSuccessful: false,
      hasProcessed: true,
      error: action.error
    };
  }
});
