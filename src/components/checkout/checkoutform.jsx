import React from 'react';

export default class CheckoutForm extends React.Component {
  static propTypes = {
    cart: React.PropTypes.object.isRequired,
    checkout: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit (event) {
    event.preventDefault();
    const checkout = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      username: this.refs.username.value,
      card: {
        cvc: this.refs.cardCVC.value,
        expiry: this.refs.cardExpiry.value,
        number: this.refs.cardNumber.value
      }
    };

    this.props.handleSubmit(checkout);
  }

  render () {
    const { checkout } = this.props;

    return (<div>
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'><strong>Customer Info</strong></h3>
        </div>
        <div className='panel-body'>
          <form>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='control-label'>First Name</label>
                  <input className='form-control input-lg' type='text' name='firstname' required placeholder='First Name' autoFocus autoComplete='on' ref='firstName' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='control-label'>Last Name</label>
                  <input className='form-control input-lg' type='text' name='firstname' required placeholder='Last Name' autoComplete='on' ref='lastName' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group'>
                  <label className='control-label'>Email Address</label>
                  <input className='form-control input-lg' type='email' name='email' placeholder='Email Address' ref='email' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='control-label'>Forum Username</label>
                  <input className='form-control input-lg' type='text' name='username' required placeholder='Username' ref='username' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='control-label'>Phone Number</label>
                  <input className='form-control input-lg' type='phone' name='phone' required placeholder='Phone Number' ref='phone' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='panel panel-default credit-card-box'>
        <div className='panel-heading'>
          <h3 className='panel-title'><span className='panel-title-text'>Payment Details </span><img className='img-responsive panel-title-image' src='/images/accepted_cards.png' /></h3>
        </div>
        <div className='panel-body'>
          <form id='payment-form' onSubmit={this._handleSubmit.bind(this)} disabled>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='form-group'>
                  <label className='control-label' htmlFor='cardNumber'>Card number </label>
                  <div className='input-group'>
                    <input className='form-control' type='tel' required placeholder='Valid Card Number' maxLength='16' minLength='16' id='cardNumber' ref='cardNumber' />
                    <div className='input-group-addon'><span><span className='fa fa-credit-card'></span></span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-7'>
                <div className='form-group'>
                  <label className='control-label' htmlFor='cardExpiry'><span className='hidden-xs'>expiration </span><span className='visible-xs-inline'>EXP </span> date</label>
                  <input className='form-control' type='tel' required placeholder='MM / YY' maxLength='4' minLength='4' id='cardExpiry' ref='cardExpiry' />
                </div>
              </div>
              <div className='col-xs-5 pull-right'>
                <div className='form-group'>
                  <label className='control-label' htmlFor='cardCVC'>cv code</label>
                  <input className='form-control' type='tel' required placeholder='CVC' id='cardCVC' ref='cardCVC' />
                </div>
              </div>
            </div>
            {!checkout.isSuccessful && checkout.hasProcessed &&
              <div className='row'>
                <div className='col-xs-12'>
                  <div className='alert alert-danger'>
                    <p><strong>Whoops!</strong> {checkout.error.message}</p>
                  </div>
                </div>
              </div>
            }
            <div className='row'>
              <div className='col-xs-12'>
                <button className='btn btn-success btn-block btn-lg' disabled={checkout.isProcessing}>
                  {checkout.isProcessing
                    ? <i className='fa fa-spin fa-spinner'></i>
                    : 'Pay Now'
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);
  }
}
