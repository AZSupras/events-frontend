import React                  from 'react';
import moment                 from 'moment';
import lodash                 from 'lodash';
import { Link }               from 'react-router';

export default class EventList extends React.Component {
  static propTypes = {
    item       : React.PropTypes.any.isRequired,
    cart       : React.PropTypes.any.isRequired,
    hasResults : React.PropTypes.bool.isRequired,
    isFetching : React.PropTypes.bool.isRequired,
    addToCart  : React.PropTypes.func.isRequired,
    removeFromCart  : React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      showCheckout: false
    };
  }

  _handleAddToCart (item, pricing) {
    this.props.addToCart(item, pricing);
  }

  _handleRemoveFromCart (item, pricing) {
    this.props.removeFromCart(item, pricing);
  }

  render () {
    const { item, cart, hasResults, isFetching } = this.props;

    function getEventDuration (StartDate, EndDate) {
      const startDate = moment(StartDate);
      const endDate   = moment(EndDate);
      return moment.duration(startDate - endDate).humanize();
    }

    function isCartEmpty () {
      const eventIndex = lodash.findIndex(cart.items, { id: item.id });
      if ( eventIndex < 0 ) {
        return true;
      } else {
        return ( cart.items[eventIndex].items.length <= 0 ) ? true : false;
      }
    }

    function isInCart (pricing) {
      const eventIndex = lodash.findIndex(cart.items, { id: item.id });
      if ( eventIndex < 0 ) {
        return false;
      } else {
        const itemIndex = lodash.findIndex(cart.items[eventIndex].items, { name: pricing.name });
        return ( itemIndex >= 0 ) ? true : false;
      }
    }

    const _images = item.images.map(function (image, imageIndex) {
      return (<div key={imageIndex} className='col-xs-12 col-md-6 col-lg-3'>
        <a href={image.url} target='_blank' className='thumbnail'><img src={image.url} className='img-responsive'/></a>
      </div>);
    });

    if ( isFetching ) {
      return (<p className='well lead text-center'>Loading Events</p>);
    } else if ( hasResults && !isFetching ) {
      const _eventPrices = item.pricing.map(function (pricing, priceIndex) {
        return (<li key={priceIndex}>
          {pricing.name} - $ {pricing.price}
          {isInCart(pricing) ?
              <button className='btn btn-danger btn-md' onClick={this._handleRemoveFromCart.bind(this, item, pricing)}><i className='fa fa-md fa-trash'></i></button>
            :
            <button
            className='btn btn-success btn-md'
            disabled={isInCart(pricing)}
            onClick={this._handleAddToCart.bind(this, item, pricing)}
            >
              Add to Cart
            </button>
          }
        </li>);
      }.bind(this));

      return (<div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h1 className='eventTitle'>{item.name}</h1>
            </div>
          </div>
        </div>
        { item.coverImage &&
          <div className='eventCoverImageContainer'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12'>
                  <img src={item.coverImage.url} className='img-responsive' />
                </div>
              </div>
            </div>
          </div>
        }
        <div className='eventDetailContainer'>
          <div className='container'>
            <section className='eventList'>
              <div className='col-md-8'>
                <div className='col-lg-12'>
                  <div dangerouslySetInnerHTML={{__html: item.content }} />
                </div>
              </div>
              <div className='col-md-4 sidebar'>
                <aside className='when'>
                  <h2>When</h2>
                  <ul className='dateList'>
                    <li><strong>Starts on</strong> {(moment(item.startDate).format('MM/DD/YY hh:mm a'))}</li>
                    <li><strong>Ends on</strong> {(moment(item.endDate).format('MM/DD/YY hh:mm a'))}</li>
                    <li><strong>Event Lasts</strong> {(getEventDuration(item.startDate, item.endDate))}</li>
                  </ul>
                </aside>
                <aside className='where'>
                  <h2>Where</h2>
                  <div className=' text-center'>
                    <img src={item.staticMap} />
                    <address><strong>{item.location.name}</strong> <br />{item.location.address}<br /> {item.location.city}, {item.location.state} {item.location.zipCode}</address>
                  </div>
                </aside>
                <aside className='pricing'>
                  <h2>Pricing</h2>
                  <ul className='pricingList'>
                    {_eventPrices}
                  </ul>
                  {!isCartEmpty() &&
                    <span>
                      <hr />
                      <Link to={`/checkout`} className='btn btn-block btn-primary'>Checkout</Link>
                    </span>
                  }
                </aside>
              </div>
            </section>
          </div>
        </div>
        { item.images.length > 0 &&
          <div className='imageGallery'>
            <div className='container'>
              <div className='row'>
                {_images}
              </div>
            </div>
          </div>
        }
      </div>);
    } else {
      return (<p className='well lead text-center'>No Event Found</p>);
    }
  }
}
