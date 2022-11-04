import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, ListGroup, Row } from "react-bootstrap";
import { Context } from "../..";

const BrandBar = observer(({inFirstPage}) => {
  const { product } = useContext(Context);

  const changBrand = (brand) => {
    product.setSelectedBrand(brand)
    inFirstPage()
  }

  return (
    <ListGroup className="mt-3">
      <ListGroup.Item variant="danger">Бренды</ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={'all' === product.selectedBrand}
        onClick={() => changBrand('all')}
        key={'all'}
      >
        Все бренды
      </ListGroup.Item>
      {product.brands.map((brand) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={brand.id === product.selectedBrand.id}
          onClick={() => changBrand(brand)}
          key={brand.id}
        >
          {brand.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default BrandBar;
