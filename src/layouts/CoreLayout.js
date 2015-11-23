import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';

import 'styles/core.scss';

import CartWidget from '../components/cart/widget';
import Footer from '../components/footer';

const mapStateToProps = (state) => ({
  cart    : state.cart,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(dispatch)
});

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element,
    cart     : React.PropTypes.object
  }

  render () {
    const { cart } = this.props;
    return (<div className='page-container'>
      { cart.items.length > 0 &&
        <CartWidget cart={cart} />
      }
      <div id='header' className='container'>
        <div className='row heading'>
          <div className='col-sm-3'><Link to={`/`}><img src='/images/logo.png' alt='AZSupras' /></Link></div>
          <div className='col-sm-9 text-right'><h1 id='title'>AZSupras Events</h1></div>
        </div>
      </div>
      <div className='view-container'>
        {this.props.children}
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
