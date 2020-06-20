import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout } from'antd';
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/product'
import ProductInfo from '../components/ProductInfo';

const { Content } = Layout;

export class Product extends Component {
    render() {
        const { id } = this.props.match.params
        const { product } = this.props.location.state
        const { addToCart } = this.props

        return(
          <Layout>
            <Content className="content">
              <ProductInfo 
                          product={product} 
                          onAddToCartClicked={() => addToCart(product.id)}/>
            </Content>
          </Layout>
        )
      }
}

Product.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    //title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart }
)(Product)
