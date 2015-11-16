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
  event  : state.event,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(eventActions, dispatch)
});
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    events   : React.PropTypes.array
  }

  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor(props, context){
    super(props, context);
  }

  componentDidMount(){
    const { dispatch } = this.context.store;
    dispatch( eventActions.fetchEvents() );
  }
  render () {
    const { event } = this.props;
    return (<div>
      <div className="container">
        <div className="row heading">
          <div className="col-sm-3"><img src="/images/logo.png" alt="AZSupras" /></div>
          <div className="col-sm-9 text-right"><h1 id="title">AZSupras Events</h1></div>
        </div>
      </div>
      <div className='container'>
        <EventList events={event} />
      </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
