import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { Context } from '../..';
import BrandBar from '../../components/BrandBar';
import ProductList from '../../components/ProductList';
import Pages from '../../components/productPages';
import TypeBar from '../../components/TypeBar';
import { fetchBrands, fetchProduct, fetchTypes, getAllProductSearch } from '../../http/productAPI';
import {BsSearch} from 'react-icons/bs'
import SortBar from '../../components/SortBar';
import PriceBar from '../../components/PriceBar';

const ProductPage = observer(() => {
  
  const {product} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data));
    fetchBrands().then(data => product.setBrands(data));
    fetchProduct(null, null, 1, 10).then(data => {
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

const [priceMax, setPriceMax] = useState(999999)
const [priceMin, setPriceMin] = useState(1)

const handlerMaxPriceChange = (priceMax) => {
  setPriceMax(priceMax)
}

const handlerMinPriceChange = (priceMin) => {
  setPriceMin(priceMin)
}

return (
    <Container>
      <Row className='mt-2'>
        <Col md={3}>
            <TypeBar />
            <BrandBar />
            <PriceBar onChange={handlerMaxPriceChange} onChangeMin={handlerMinPriceChange}/>
        </Col>
        <Col md={9}>
          <ProductList price={priceMax} priceMin={priceMin}/>
          <Pages />
        </Col>
      </Row>
    </Container>

  )
})

export default ProductPage;
