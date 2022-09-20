import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import ProductItem from "./productItem/ProductItem";
import { Context } from "..";
import { BsSearch } from "react-icons/bs";
import SortBar from "./SortBar";

const ProductList = observer(({price, priceMin}) => {
  const { product } = useContext(Context);

    const [methodSort, setSortMethod] = useState('')

    const handlerSortMethodChange = (value) => {
      setSortMethod(value)
    }

    let sort = (a,b) => a > b ? 1:-1
    if(methodSort == 'Сначало дешевые'){
      sort = (a,b) => a.price > b.price ? 1:-1
    }

    if(methodSort == 'Сначало дорогие'){
      sort = (a,b) => b.price > a.price ? 1:-1
    }

    if(methodSort == 'От А до Я (A - Z)'){
      sort = (a,b) => a.name > b.name ? 1:-1
    }

    if(methodSort == 'От Я до А (Z - A)'){
      sort = (a,b) => b.name > a.name ? 1:-1
    }


    const [searchValue, setSearchValue] = useState('')

    const filteredProduct = product.products.filter(prod => {
      return prod.name.toLowerCase().includes(searchValue.toLowerCase())
    })


  return (
    <div>
      <Form>
        <Row>
          <Col md={9} style={{ padding: 0 }}>
            <FormControl
              type="search"
              placeholder="Поиск"
              aria-label="Search"
              onChange={e => setSearchValue(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <SortBar onChange={handlerSortMethodChange}/>
          </Col>
        </Row>
      </Form>

      <Row className="d-flex">
        {filteredProduct.slice().sort(sort).map((product) => (
          ((product.price <= (Number(price))) && (product.price >= (Number(priceMin)))) ? <ProductItem key={product.id} product={product} /> : null
        ))}
      </Row>
    </div>
  );
});

export default ProductList;
