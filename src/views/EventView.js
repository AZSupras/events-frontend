import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';


import eventActions           from 'actions/event';
import EventDetail            from 'components/event/detail';

import cartActions           from 'actions/cart';
// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  events      : state.events,
  cart        : state.cart,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(eventActions, cartActions, dispatch)
});
export class EventView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    events   : React.PropTypes.object,
    cart     : React.PropTypes.object,
    params   : React.PropTypes.object
  }

  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  }

  componentWillMount () {
    const { dispatch } = this.context.store;
    const { id } = this.props.params;
    dispatch( eventActions.fetchEvent({ id: id }) );
  }


  _addToCart (event, pricing) {
    const { dispatch } = this.context.store;
    dispatch( cartActions.addToCart({event, pricing}) );
  }

  _removeFromCart (event, pricing) {
    const { dispatch } = this.context.store;
    dispatch( cartActions.removeFromCart({event, pricing}) );
  }

  render () {
    const { cart, events } = this.props;
    return (<EventDetail
        item={events.result}
        cart={cart}
        hasResults={events.hasResults}
        isFetching={events.isFetching}
        addToCart={this._addToCart.bind(this)}
        removeFromCart={this._removeFromCart.bind(this)}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);
