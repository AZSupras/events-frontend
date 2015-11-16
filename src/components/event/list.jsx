import React                  from 'react';
import moment                 from 'moment';

export default class EventList extends React.Component {
  static propTypes = {
    events   : React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
  }

  render() {
    const { results, hasResults, isFetching, meta } = this.props.events;

    var _events = results.map(function(event, index){
      const classNames = (index > 0) ? 'col-md-4 events' : 'col-xs-12 events firstEvent';

      var _eventPrices = event.pricing.map(function(pricing, index){
        return(<li key={index}>{pricing.name} - ${pricing.price}</li>);
      });

      return (<div className={classNames}>
        <div className="eventContainer">
          <div className="eventTitleContainer">
            <div className="col-xs-8">
              <h3 className="eventTitle">{event.name}</h3>
            </div>
            <div className="col-xs-4 text-right">
              <ul className="eventDates">
                <li><h4 className="eventDate">{(moment(event.startDate).format('MM/DD/YY hh:mm a'))}</h4></li>
                <li><h4 className="eventDate">{(moment(event.endDate).format('MM/DD/YY hh:mm a'))}</h4></li>
              </ul>
            </div>
          </div>
          <div className="eventDetailsContainer">
            <div className="eventPricing col-xs-6">
              <strong>Prices</strong>
              <ul>
                {_eventPrices}
              </ul>
            </div>
            <div className="eventActions col-xs-6 text-right">
              {event.attendees.length > 0 &&
                <span className="label label-default" >{event.attendees.length} People Going</span>
              }
              <ul className="eventButtons">
                <li><button className="btn btn-primary">Read More...</button></li>
                <li><button className="btn btn-success">Order Now</button></li>
              </ul>
            </div>
          </div>
          <div className="eventImageContainer">
            <img className="img-responsive" src={event.coverImage.url} />
          </div>
        </div>
      </div>);
    });

    return (<div>
      <h1>Event List</h1>
      {isFetching &&
        <p className="well lead text-center">Loading Events</p>
      }
      {!hasResults && !isFetching
        ? <p className="well lead text-center">No Upcoming Events</p>
        : <section className="eventsList">
          {_events}
        </section>
      }
    </div>);
  }
}
