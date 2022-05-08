import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import ProductItem from "./productItem/ProductItem";
import { Context } from "..";
import { BsSearch } from "react-icons/bs";
import SortBar from "./SortBar";

const ProductList = observer(() => {
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


  return (
    <div>
      <Form>
        <Row>
          <Col md={8} style={{ padding: 0 }}>
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </Col>
          <Col md={1} style={{ padding: 0 }}>
            <Button variant="outline-danger" style={{marginLeft: '5px'}}>
              <BsSearch />
            </Button>
          </Col>
          <Col md={3}>
            <SortBar onChange={handlerSortMethodChange}/>
          </Col>
        </Row>
      </Form>

      <Row className="d-flex">
        {product.products.slice().sort(sort).map((product) => (
         <ProductItem key={product.id} product={product} />
        ))}
      </Row>
    </div>
  );
});

export default ProductList;
