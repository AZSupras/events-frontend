import React                  from 'react';
import { Link }               from 'react-router';

export default class CartWidget extends React.Component {
  static propTypes = {
    cart: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { cart } = this.props;
    return (<span id='cartWidget'>
      <Link to='/checkout'>({cart.totalQty}) ${cart.totalCost}</Link>
    </span>);
  }
}
