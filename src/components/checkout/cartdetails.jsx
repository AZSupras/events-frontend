import React from 'react';

export default class CartDetails extends React.Component {
  static propTypes = {
    cart: React.PropTypes.object.isRequired,
    handleSaveQty: React.PropTypes.func.isRequired,
    handleRemoveItem: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      updatingQty: false,
      itemIndex: null,
      event: {},
      pricing: {},
      newQty: null,
      eventIndex: null
    };
  }

  saveNewQty () {
    const { cart, handleSaveQty } = this.props;
    const { itemIndex, newQty, eventIndex } = this.state;
    cart.items[eventIndex].items[itemIndex].qty = newQty;
    this.setState({
      updatingQty: false,
      itemIndex: null,
      newQty: null,
      eventIndex: null
    });
    handleSaveQty();
  }

  updateQty (event) {
    this.setState({
      newQty: event.target.valueAsNumber
    });
  }

  removeItem (itemIndex, eventIndex) {
    this.props.handleRemoveItem(itemIndex, eventIndex);
  }

  cancelUpdateQty () {
    this.setState({
      updatingQty: false
    });
  }

  editQty (itemIndex, eventIndex) {
    this.setState({
      updatingQty: true,
      eventIndex: eventIndex,
      itemIndex: itemIndex
    });
  }

  render () {
    const { cart } = this.props;
    const self = this;

    const _cartItems = cart.items.map(function (event, index) {
      const eventItems = event.items.map(function (item, itemIndex) {
        return (<tr key={itemIndex}>
          <td>{item.name}</td>
          <td className='col-xs-4 col-sm-3'>
            <div className='form-contorl'>
              {(self.state.updatingQty && self.state.itemIndex === itemIndex)
                ? <div className='input-group'>
                  <input
                    type='number'
                    className='form-control input-sm'
                    defaultValue={item.qty}
                    onChange={self.updateQty.bind(self)}
                    ref='qty'
                    max='10'
                    min='1'
                  />
                  <div className='input-group-btn'>
                    <button className='btn btn-sm btn-success' onClick={self.saveNewQty.bind(self)}><i className='fa fa-xs fa-floppy-o'></i></button>
                    <button className='btn btn-sm btn-warning' onClick={self.cancelUpdateQty.bind(self)}><i className='fa fa-xs fa-ban'></i></button>
                  </div>
                </div>
              : <p>
                {item.qty} <a href='#' onClick={self.editQty.bind(self, itemIndex, index)}>Edit</a> <a href='#' onClick={self.removeItem.bind(self, event, item)}>Remove</a>
                </p>
            }
            </div>
          </td>
          <td>${item.itemCost.toFixed(2)}</td>
          <td>${(item.unitCost * item.qty).toFixed(2)}</td>
        </tr>);
      });

      return (<tbody key={index}>
        <tr>
          <td colSpan='5'><strong>{event.name}</strong></td>
        </tr>
        {eventItems}
      </tbody>);
    });

    return (<div className='panel panel-default'>
      <div className='panel-heading'>
        <h3 className='panel-title'><strong>Cart Details</strong></h3>
      </div>
      <div className='panel-body'>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Item </th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Sub Total</th>
              </tr>
            </thead>
              {cart.items.length > 0
                ? _cartItems
                : <tbody>
                    <tr>
                      <td colSpan='4'>
                        <p className='well text-center'><strong>Nothing in your cart</strong></p>
                      </td>
                    </tr>
                  </tbody>
              }
            <tfoot>
              <tr className='info'>
                <td colSpan='3'><strong>Grand Total</strong></td>
                <td><strong>${cart.totalCost}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>);
  }
}
