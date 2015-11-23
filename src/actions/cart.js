import { CART_ADD, CART_REMOVE, CART_TOTAL } from 'constants/cart';

export default {
  addToCart: function (item) {
    return dispatch => {
      dispatch({ type : CART_ADD, payload: { item } });
      dispatch({ type: CART_TOTAL });
    };
  },
  updateQty: function () {
    return dispatch => {
      dispatch({ type: CART_TOTAL });
    };
  },
  removeFromCart: function (itemIndex, eventIndex) {
    return dispatch => {
      dispatch({ type: CART_REMOVE, payload: { itemIndex, eventIndex } });
      dispatch({ type: CART_TOTAL });
    };
  }
};
