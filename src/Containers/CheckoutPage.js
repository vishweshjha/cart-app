import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartItemCard from '../Components/CartItemCard';
import PriceBar from '../Components/PriceBar';
import './checkout-page.scss';
import {Container,Button,Row,Col} from 'reactstrap';

const renderCartItems = (details) => {
  const cartItems = details.map(item => (
    <CartItemCard key={item.id} item={item} />
  ));
  return cartItems;
};

const renderPriceBar = (price, discount, typeDiscount, cartCount) => (<PriceBar
  price={price}
  discount={discount}
  typeDiscount={typeDiscount}
  cartCount={cartCount}
/>);

const priceCalculate = (itemDetails, cartCount) => {
  let totalPrice = 0;
  let totalDiscount = 0;
  let totalTypeDiscount = 0;
  itemDetails.map((item) => { // eslint-disable-line
    totalPrice += item.price * item.count;
    totalDiscount += item.price * (item.discount / 100) * item.count;
    totalTypeDiscount += (item.type === 'fiction') ? (item.price * 0.15) * item.count : 0;
  });
  return renderPriceBar(totalPrice, totalDiscount, totalTypeDiscount, cartCount);
};

const goBack = (props) => {
  props.history.push('/home');
};

const CheckoutPage = (props) => {
  const { cartCount } = props;
  if (cartCount <= 0) {
    goBack(props);
  }
  const cartDetails = Object.keys(props.cartList).map(key => props.cartList[key]);
  return (
    <Container>
       <div className='checkout-container'>
        <div className='checkout-header'>
          <Button color="info" onClick={() => goBack(props)}> Go Back </Button>
          <div className='summary'>Order Summary</div>
        </div>
        <div className='checkout-view'>
          <Row>
            <Col xs={12} sm={8}>
              <div className='cart-item-list'>
               {renderCartItems(cartDetails)}
            </div>
            </Col>
            <Col xs={12} sm={4}>
                 {priceCalculate(cartDetails, cartCount)}
            </Col>
          </Row>

        </div>
      </div>
    </Container>
  );
};
const mapStateToProps = state => ({
  cartList: state.listingReducer.cartList,
  cartCount: state.listingReducer.cartCount,
});

export default connect(mapStateToProps)(CheckoutPage);

CheckoutPage.propTypes = {
  cartList: PropTypes.PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  cartCount: PropTypes.number.isRequired,
};
