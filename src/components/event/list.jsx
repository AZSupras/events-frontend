import React                  from 'react';
import moment                 from 'moment';
import { Link }               from 'react-router';

export default class EventList extends React.Component {
  static propTypes = {
    events   : React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { results, hasResults, isFetching } = this.props.events;
    const _events = results.map(function (event, index) {
      const classNames = (index > 0) ? 'col-md-4 events' : 'col-xs-12 events firstEvent';
      const _eventPrices = event.pricing.map(function (pricing, priceIndex) {
        return (<li key={priceIndex}>{pricing.name} - ${pricing.price}</li>);
      });

      return (<div className={classNames} key={index}>
        <div className='eventContainer'>
          <div className='eventTitleContainer'>
            <div className='col-xs-8'>
              <h3 className='eventTitle'>{event.name}</h3>
            </div>
            <div className='col-xs-4 text-right'>
              <ul className='eventDates'>
                <li><h4 className='eventDate'>{(moment(event.startDate).format('MM/DD/YY hh:mm a'))}</h4></li>
                <li><h4 className='eventDate'>{(moment(event.endDate).format('MM/DD/YY hh:mm a'))}</h4></li>
              </ul>
            </div>
          </div>
          <div className='eventDetailsContainer'>
            <div className='eventPricing col-xs-6'>
              <strong>Prices</strong>
              <ul>
                {_eventPrices}
              </ul>
            </div>
            <div className='eventActions col-xs-6 text-right'>
              {event.attendees.length > 0 &&
                <span className='label label-default' >{event.attendees.length} People Going</span>
              }
              <ul className='eventButtons'>
                <li><Link to={`/event/${event.id}`} className='btn btn-primary'>Read More...</Link></li>
              </ul>
            </div>
          </div>
          <div className='eventImageContainer'>
            <img className='img-responsive' src={(event.coverImage) ? event.coverImage.url : 'https://placeholdit.imgix.net/~text?txtsize=88&txt=940%C3%97600&w=1110&h=300'} />
          </div>
        </div>
      </div>);
    });


    return (<div>
      <div className='row'>
        <div className='col-xs-12'>
          <h1>Event List</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          {!hasResults && !isFetching
            ? <p className='well lead text-center'>No Upcoming Events</p>
            :
              <section className='eventsList'>
                {_events}
              </section>
          }
        </div>
      </div>
    </div>);
  }
}
