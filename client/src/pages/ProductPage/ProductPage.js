import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import BrandBar from '../../components/BrandBar';
import ProductList from '../../components/ProductList';
import TypeBar from '../../components/TypeBar';

function ProductPage() {
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
}

export default ProductPage;
