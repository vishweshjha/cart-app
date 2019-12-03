import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setProductsAction, addItemAction } from '../Actions/listingPageActions';
import showHideToastAction from '../Actions/toastActions';
import ItemCard from '../Components/ItemCard';
import axios from 'axios';
import './toast.scss';
import {Row,Container,Button} from 'reactstrap';

class ListingPage extends Component {


  componentDidMount(){
    const { setProductList } = this.props;
    const fetchData = async () => {
      const result = await axios(
        'https://api.myjson.com/bins/qhnfp'
      );
      setProductList({ productList: result.data });
    };
    fetchData();
  }

  showToast = (id) => {
    const {
      showHideToastMethod,
    } = this.props;
    showHideToastMethod({
      isToastActive: true,
      toastMessage: `Item id ${id} added successfully!!`,
    });
  }
  hideToast = () => {
    const {
      showHideToastMethod,
    } = this.props;
    showHideToastMethod({ isToastActive: false });
  }
  addItem = (id) => {
    const {
      addItemMethod,
    } = this.props;
    addItemMethod({ id });
    this.showToast(id);
  }
  checkout = () => {
    this.props.history.push('/checkout');
  }
  renderItemCard = (productList) => {
    if (productList.length > 0) {
      const itemCards = productList.map(i => (
        <ItemCard key={i.id} itemDetails={i} addItem={this.addItem} />
      ));
      return itemCards;
    } return <div className='text-center'> No results found </div>;
  }

  render() {
    const { props, renderItemCard } = this;
    const {
      productList, cartCount, isToastActive, toastMessage,
    } = props;
    if (isToastActive) {
      setTimeout(this.hideToast, 3000);
    }
    return (
      <Container>
        {isToastActive && <div className='toast-bar'> {toastMessage} </div>}
          <div className='header'>
            <div className='all-items'>Shopping Cart</div>
            {cartCount > 0 &&
              <Button color="info" onClick={this.checkout}> Go to cart ({cartCount})
              </Button>
            }
          </div>
          <hr />
          <Row>
              {renderItemCard(productList)}
          </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.listingReducer.productList,
  cartList: state.listingReducer.cartList,
  cartCount: state.listingReducer.cartCount,
  isToastActive: state.toastReducer.isToastActive,
  toastMessage: state.toastReducer.toastMessage,
});

const mapDispatchToProps = dispatch => ({
  setProductList: props => dispatch(setProductsAction(props)),
  addItemMethod: props => dispatch(addItemAction(props)),
  showHideToastMethod: props => dispatch(showHideToastAction(props)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);

ListingPage.propTypes = {
  setProductList: PropTypes.func.isRequired,
  addItemMethod: PropTypes.func.isRequired,
  router: PropTypes.PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  showHideToastMethod: PropTypes.func.isRequired,
};
