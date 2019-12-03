import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './item-card.scss';
import {Button,Col} from 'reactstrap';

export const calculateDiscount = (price, discount) => price - (price * (discount / 100));

const ItemCard = (props) => {
  const { itemDetails, addItem } = props;
  const disClass = itemDetails.discount <= 0 ? 'invisible' : '';
  return (
    <Col xs={12} sm={3}>
        <div className='item-card'>
      <div className='item-display'>
        <div className={classNames('discount', disClass)} >
          {`${itemDetails.discount} % off`}
        </div>
        <div className='image-container'>
          <img
            className='item-image'
            alt={itemDetails.name}
            src={itemDetails.img_url}
          />
        </div>
      </div>
      <div className='item-details'>
        <div className='item-name'>{itemDetails.name}</div>
        <div className='item-prices'>
          {itemDetails.discount > 0 &&
          <div className='item-price-strike'>
            <span className='price-amount'>{itemDetails.price}</span>
          </div>
        }
          <span className='discounted-price'>{calculateDiscount(itemDetails.price, itemDetails.discount)}</span>
          <Button color="primary" className='addtocart-btn' onClick={() => addItem(itemDetails.id)} >
                Add to cart
          </Button>

        </div>
      </div>
    </div>
    </Col>

  );
};

export default ItemCard;

ItemCard.propTypes = {
  itemDetails: PropTypes.PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  addItem: PropTypes.func.isRequired,
};
