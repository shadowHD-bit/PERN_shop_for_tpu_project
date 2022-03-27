import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import BrandBar from '../../components/BrandBar';
import ProductList from '../../components/ProductList';
import TypeBar from '../../components/TypeBar';
import { fetchBrands, fetchProduct, fetchTypes } from '../../http/productAPI';

const ProductPage = observer(() => {
  
  const {product} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data))
    fetchBrands().then(data => product.setBrands(data))
    fetchProduct(null, null, 1, 2).then(data => {
      product.setProduct(data.rows)
      product.setTotalCount(data.count)
    })
}, [])

useEffect(() => {
  fetchProduct(product.selectedType.id, product.selectedBrand.id, product.page, 2).then(data => {
      product.setProduct(data.rows)
        product.setTotalCount(data.count)
    })
}, [product.page, product.selectedType, product.selectedBrand,])

  return (

    <Container>
      <Row className='mt-2'>
        <Col md={3}>
            <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <ProductList />
        </Col>
      </Row>
    </Container>

  )
})

export default ProductPage;
