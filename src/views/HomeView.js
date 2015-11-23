import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';


import eventActions           from 'actions/event';
import EventList              from 'components/event/list';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  events  : state.events,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(eventActions, dispatch)
});
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    events   : React.PropTypes.object
  }

  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  }

  componentDidMount () {
    const { dispatch } = this.context.store;
    dispatch( eventActions.fetchEvents() );
  }
  render () {
    const { events } = this.props;
    return (<div>
      <div className='container'>
        <EventList events={events} />
      </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
