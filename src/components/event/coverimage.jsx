import React from 'react';

export class CoverImage extends React.Component {
  static propTypes = {
    image: React.PropTypes.object
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { image } = this.props;
    return (<div className='eventCoverImageContainer'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <img src={image} className='img-responsive' />
          </div>
        </div>
      </div>
    </div>);
  }
}
