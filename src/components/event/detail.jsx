import React                  from 'react';
import moment                 from 'moment';


import { CoverImage }         from './coverimage';
import { ImageGallery }       from './imagegallery';
import { CartBlock }          from '../cart/cartblock';

export default class EventDetail extends React.Component {
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
  }

  addToCart (item, price) {
    this.props.addToCart(item, price);
  }

  removeFromCart (item, price) {
    this.props.removeFromCart(item, price);
  }

  render () {
    const { item, cart, hasResults, isFetching } = this.props;

    function getEventDuration (StartDate, EndDate) {
      const startDate = moment(StartDate);
      const endDate   = moment(EndDate);
      return moment.duration(startDate - endDate).humanize();
    }


    if ( isFetching ) {
      return (<p className='well lead text-center'>Loading Events</p>);
    } else if ( hasResults && !isFetching ) {
      return (<div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h1 className='eventTitle'>{item.name}</h1>
            </div>
          </div>
        </div>
        { item.coverImage &&
          <CoverImage image={item.coverImage} />
        }
        <div className='eventDetailContainer'>
          <div className='container'>
            <section className='eventList'>
              <div className='col-md-8'>
                <div dangerouslySetInnerHTML={{__html: item.content }} />
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
                <CartBlock
                  prices={item.pricing}
                  cart={cart}
                  eventId={item.id}
                  addToCart={this.addToCart.bind(this, item)}
                  removeFromCart={this.removeFromCart.bind(this, item)}
                />
              </div>
            </section>
          </div>
        </div>
        { item.images.length > 0 &&
          <div className='imageGallery'>
            <div className='container'>
              <div className='row'>
                <ImageGallery images={item.images} />
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
