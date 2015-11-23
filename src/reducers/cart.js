import lodash from 'lodash';
import { createReducer }     from '../utils';
import { CART_TOTAL, CART_ADD, CART_REMOVE, CART_CLEAR } from 'constants/cart';

const initialState = {
  items: [],
  totalQty: 0,
  totalCost: 0.00
};

export default createReducer(initialState, {
  [CART_REMOVE] : function (state, action) {
    let newState = Object.assign({}, state);
    newState.items[action.eventIndex].items.splice(action.itemIndex, 1);

    if (newState.items[action.eventIndex].items.length <= 0) {
      newState = initialState;
    }

    return newState;
  },
  [CART_CLEAR] : function (state) {
    let newState = Object.assign({}, state);
    newState = initialState;
    return newState;
  },
  [CART_ADD] : function (state, action) {
    const newState = Object.assign({}, state);
    let eventIndex = lodash.findIndex(newState.items, { id: action.item.event.id });

    // if the event isn't in the cart already
    if (eventIndex < 0) {
      newState.items = [{
        id: action.item.event.id,
        name: action.item.event.name,
        items: []
      }];
      eventIndex = 0;
    }

    let itemIndex = lodash.findIndex(newState.items[eventIndex].items, { name: action.item.pricing.name });

    // if the item isn't in the event cart yet
    if (itemIndex < 0) {
      newState.items[eventIndex].items.push({
        name: action.item.pricing.name,
        qty: 1,
        unitCost: action.item.pricing.price
      });
      itemIndex = 0;
    }
    return newState;
  },
  [CART_TOTAL]  : function (state, action) {
    const NewState = Object.assign({}, state);
    const totalCost = 0.00;
    const totalQty = 0;
    lodash.each(NewState.items, function (event) {
      event.eventCost = 0.00;
      event.totalQty = 0;
      lodash.each(event.items, function (item) {
        item.itemCost = item.qty * item.unitCost.toFixed(2);
        event.eventCost = event.eventCost + item.itemCost;
        event.totalQty = event.totalQty + item.qty;
      });
      NewState.totalCost = (totalCost + event.eventCost).toFixed(2);
      NewState.totalQty  = totalQty + event.totalQty;
    });
    return NewState;
  }
});
