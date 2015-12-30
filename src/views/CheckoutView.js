import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import cartActions            from 'actions/cart';

import checkoutActions        from 'actions/checkout';
import CartDetails            from '../components/checkout/cartdetails';
import CheckoutForm           from '../components/checkout/checkoutform';
// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  events      : state.events,
  cart        : state.cart,
  checkout    : state.checkout,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(cartActions, checkoutActions, dispatch)
});
export class CheckoutView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    cart     : React.PropTypes.object,
    params   : React.PropTypes.object,
    checkout : React.PropTypes.object
  }

  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  }

  componentWillMount () {

  }

  updateQty () {
    const { dispatch } = this.context.store;
    dispatch( cartActions.updateQty() );
  }

  removeItem (event, pricing) {
    const { dispatch } = this.context.store;
    dispatch( cartActions.removeFromCart({ event, pricing }) );
  }

  processCheckout (checkout) {
    const { dispatch } = this.context.store;
    const { cart } = this.props;
    dispatch( checkoutActions.processCard(cart, checkout) );
  }

  render () {
    const { cart, checkout } = this.props;
    return (<div className='container'>
      {checkout.hasProcessed === true && checkout.isSuccessful === true
        ? <p className='well text-center'>Check your email for the receipt and your ticket</p>
        : <div>
            <div className={(cart.items.length > 0) ? 'col-md-7' : 'col-md-12'}>
              <CartDetails cart={cart} handleSaveQty={this.updateQty.bind(this)} handleRemoveItem={this.removeItem.bind(this)} />
            </div>
            {cart.items.length > 0 &&
              <div className='col-md-5'>
                <CheckoutForm cart={cart} checkout={checkout} handleSubmit={this.processCheckout.bind(this)} />
              </div>
            }
          </div>
      }
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView);
