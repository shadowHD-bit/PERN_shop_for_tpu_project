import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { Context } from '../..';
import BrandBar from '../../components/BrandBar';
import ProductList from '../../components/ProductList';
import Pages from '../../components/productPages';
import TypeBar from '../../components/TypeBar';
import { fetchBrands, fetchProduct, fetchTypes } from '../../http/productAPI';
import {BsSearch} from 'react-icons/bs'

const ProductPage = observer(() => {
  
  const {product} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data));
    fetchBrands().then(data => product.setBrands(data));
    fetchProduct(null, null, 1, 9).then(data => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
}, []);

useEffect(
    () => {
        if(product.selectedType === "all") {
          fetchProduct(null, product.selectedBrand.id, product.page, 9).then(data => {
                  product.setProduct(data.rows);
                  product.setTotalCount(data.count);
                });
            } else {
              fetchProduct(product.selectedType.id, product.selectedBrand.id, product.page, 9).then(data => {
                  product.setProduct(data.rows);
                  product.setTotalCount(data.count);
                });
            }
    }, [product.page, product.selectedType, product.selectedBrand],
);


  return (

    <Container>
      <Row className='mt-2'>
        <Col md={3}>
            <TypeBar />
            <BrandBar />
        </Col>
        <Col md={9}>
        <Form>
          <Row>
            <Col md={11} style={{padding:0}}>
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            </Col>
            <Col  md={1} style={{padding:0}}>
            <Button variant="outline-danger"><BsSearch /></Button>
            </Col>
          </Row>
        </Form>
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>

  )
})

export default ProductPage;
