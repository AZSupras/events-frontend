import React                  from 'react';
import lodash                 from 'lodash';
import { Link }               from 'react-router';

export class CartBlock extends React.Component {
  static propTypes = {
    prices         : React.PropTypes.any.isRequired,
    cart           : React.PropTypes.any.isRequired,
    eventId        : React.PropTypes.string.isRequired,
    addToCart      : React.PropTypes.func.isRequired,
    removeFromCart : React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  addToCart (price) {
    this.props.addToCart(price);
  }

  removeFromCart (price) {
    this.props.removeFromCart(price);
  }

  render () {
    const { prices, cart, eventId } = this.props;
    const isCartEmpty = () => {
      const eventIndex = lodash.findIndex(cart.items, { id: eventId });
      if ( eventIndex < 0 ) {
        return true;
      } else {
        return ( cart.items[eventIndex].items.length <= 0 ) ? true : false;
      }
    };

    const isInCart = (pricing) => {
      const eventIndex = lodash.findIndex(cart.items, { id: eventId });
      if ( eventIndex < 0 ) {
        return false;
      } else {
        const itemIndex = lodash.findIndex(cart.items[eventIndex].items, { name: pricing.name });
        return ( itemIndex >= 0 ) ? true : false;
      }
    };

    const _prices = prices.map(function (price, index) {
      return (<li key={index}>
        {price.name} - $ {price.price}
        {isInCart(price)
          ?
            <button className='btn btn-danger btn-md' onClick={this.removeFromCart.bind(this, price)}><i className='fa fa-md fa-trash'></i></button>
          :
            <button className='btn btn-success btn-md' disabled={isInCart(price)} onClick={this.addToCart.bind(this, price)}>Add to Cart</button>
        }
      </li>);
    }.bind(this));

    return (<aside className='pricing'>
      <h2>Pricing</h2>
      <ul className='pricingList'>
        {_prices}
      </ul>
      {!isCartEmpty() &&
        <span>
          <hr />
          <Link to={`/checkout`} className='btn btn-block btn-primary'>Checkout</Link>
        </span>
      }
    </aside>);
  }
}
