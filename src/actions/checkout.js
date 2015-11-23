import axios from 'axios';
import lodash from 'lodash';
import { STRIPE_GET_TOKEN, STRIPE_GOT_TOKEN, PAYMENT_PROCESS, PAYMENT_PROCESSED, PAYMENT_FAILED } from 'constants/checkout';
import { CART_CLEAR } from 'constants/cart';

export default {
  processCard: function (cart, checkout) {
    return (dispatch, getState) => {
      const state = getState();

      dispatch({ type: STRIPE_GET_TOKEN, payload: { cart, checkout } });
      const url = CONFIG[process.env.NODE_ENV].STRIPE_URL + '/tokens';
      const exp = checkout.card.expiry.match(/.{1,2}/g);
      const card = {
        'card[number]': checkout.card.number,
        'card[exp_month]': exp[0],
        'card[exp_year]': exp[1],
        'card[cvc]': checkout.card.cvc
      };
      let formBody = [];
      for (const property in card) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(card[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      axios.post(url, formBody, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + CONFIG[process.env.NODE_ENV].STRIPE_KEY
        }
      })
      .then((response) => {
        const payload = {
          type: STRIPE_GOT_TOKEN
        };
        dispatch(payload);
        return response.data.id;
      })
      .then((token) => {
        dispatch({ type: PAYMENT_PROCESS });
        const url = CONFIG[process.env.NODE_ENV].API_URL + '/payment/process';
        axios.post(url, {
          attendee: {
            email: checkout.email,
            firstname: checkout.firstName,
            lastname: checkout.lastName,
            phone: checkout.phone,
            username: checkout.username
          },
          cart: cart,
          payment: {
            stripeToken: token,
            amount: cart.totalCost
          }
        })
        .then((response) => {
          dispatch({ type: PAYMENT_PROCESSED, payload: response });
          dispatch({ type: CART_CLEAR });
        })
        .catch((error) => {
          const err = error.data;
          dispatch({ type: PAYMENT_FAILED, payload: { error: err } });
        });
      })
      .catch((error) => {
        if (error.status === 402) {
          const err = error.data.error;
          dispatch({ type: PAYMENT_FAILED, payload: { error: err } })
        }
      });
    };
  }
};
