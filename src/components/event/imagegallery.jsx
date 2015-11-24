import React                  from 'react';

export class ImageGallery extends React.Component {
  static propTypes = {
    images: React.PropTypes.any.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { images } = this.props;

    const { _images } = images.map(function (image, index) {
      return (<div key={index} className='col-xs-12 col-md-6 col-lg-3'>
        <a href={image.url} target='_blank' className='thumbnail'><img src={image.url} className='img-responsive'/></a>
      </div>);
    });
    return (<div>{_images}</div>);
  }
}
