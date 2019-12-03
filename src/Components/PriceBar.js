import React from 'react';
import PropTypes from 'prop-types';

const PriceBar = (props) => {
  const {
    price, discount, typeDiscount, cartCount,
  } = props;
  return (
    <div className='price-container'>
      <div><b>Total</b></div>
      <div>
        <div>Items({cartCount})</div>
        <div>:</div>
        <div>{price}</div>
      </div>
      <div>
        <div>Discount</div>
        <div>:</div>
        <div>{discount}</div>
      </div>
      <div>
        <div>Type discount</div>
        <div>:</div>
        <div>{typeDiscount}</div>
      </div>
      <div className='total'>
        <div>Order total</div>
        <div>:</div>
        <div>{price - discount - typeDiscount}</div>
      </div>
    </div>
  );
};
export default PriceBar;

PriceBar.propTypes = {
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  typeDiscount: PropTypes.number.isRequired,
  cartCount: PropTypes.number.isRequired,
};
