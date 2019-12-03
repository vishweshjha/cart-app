import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemAction, removeItemAction, deleteItemAction } from '../Actions/listingPageActions';
import { calculateDiscount } from './ItemCard';
import {Button,Row,Col}from 'reactstrap';


const CartItemCard = ({item, addItemMethod, removeItemMethod, deleteItemMethod,}) => {

  return (
    <Col xs={12}>
        <div className='cart-item'>
        <div className='cart-item-card'>
          <div className="image-container">
          <img
            src={item.img_url}
            className='cart-item-image'
            alt={item.name}
          />
          </div>
          <div className='item-cart-name'>{item.name}</div>
          <Button
            className='cart-item-delete'
            color='success'
            onClick={() => deleteItemMethod({ id: item.id })}
            onKeyPress={() => deleteItemMethod({ id: item.id })}
          >
            X
          </Button>
        </div>
        <div className='cart-item-actions'>
          <Button
            className='cart-item-remove'
            color='success'
            onClick={item.count === 1
              ? () => deleteItemMethod({ id: item.id })
              : () => removeItemMethod({ id: item.id })
            }
            onKeyPress={item.count === 1
              ? () => deleteItemMethod({ id: item.id })
              : () => removeItemMethod({ id: item.id })
            }
          >
            -
          </Button>
          <div className='cart-item-quantity'>
            <p>{item.count}</p>
          </div>
          <Button
            className='cart-item-add'
            color='success'
            onClick={() => addItemMethod({ id: item.id })}
            onKeyPress={() => addItemMethod({ id: item.id })}
          >
            +
          </Button>
        </div>
        <div className='cart-item-price'>
          {item.count * calculateDiscount(item.price, item.discount)}
        </div>
      </div>
    </Col>
  );
};

const mapStateToProps = state => ({
  cartList: state.listingReducer.cartList,
});
const mapDispatchToProps = dispatch => ({
  addItemMethod: props => dispatch(addItemAction(props)),
  removeItemMethod: props => dispatch(removeItemAction(props)),
  deleteItemMethod: props => dispatch(deleteItemAction(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartItemCard);

CartItemCard.propTypes = {
  item: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    count: PropTypes.number,
    img_url: PropTypes.string,
  }).isRequired,
  addItemMethod: PropTypes.func.isRequired,
  removeItemMethod: PropTypes.func.isRequired,
  deleteItemMethod: PropTypes.func.isRequired,
};
