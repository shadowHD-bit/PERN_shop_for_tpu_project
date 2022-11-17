import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "../..";
import BrandBar from "../../components/Bar/BrandBar";
import ProductList from "../../components/ProductList";
import Pages from "../../components/productPages";
import TypeBar from "../../components/Bar/TypeBar";
import { fetchBrands, fetchProduct, fetchTypes } from "../../http/productAPI";
import PriceBar from "../../components/Bar/PriceBar";
import { useLocation } from "react-router-dom";

const ProductPage = observer(() => {
  const { product } = useContext(Context);

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data.rows));
    fetchBrands().then((data) => product.setBrands(data.rows));
    fetchProduct(null, null).then((data) => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    if (product.selectedType === "all" && product.selectedBrand === "all") {
      fetchProduct(null, null).then((data) => {
        product.setProduct(data.rows);
        product.setTotalCount(data.count);
      });
    } else if (
      product.selectedType !== "all" &&
      product.selectedBrand === "all"
    ) {
      fetchProduct(product.selectedType.id, null).then((data) => {
        product.setProduct(data.rows);
        product.setTotalCount(data.count);
      });
    } else if (
      product.selectedType === "all" &&
      product.selectedBrand !== "all"
    ) {
      fetchProduct(null, product.selectedBrand.id).then((data) => {
        product.setProduct(data.rows);
        product.setTotalCount(data.count);
      });
    } else {
      fetchProduct(product.selectedType.id, product.selectedBrand.id).then(
        (data) => {
          product.setProduct(data.rows);
          product.setTotalCount(data.count);
        }
      );
    }
  }, [product.selectedType, product.selectedBrand]);

  const [priceMax, setPriceMax] = useState(999999);
  const [priceMin, setPriceMin] = useState(1);

  const handlerMaxPriceChange = (priceMax) => {
    setPriceMax(priceMax);
  };

  const handlerMinPriceChange = (priceMin) => {
    setPriceMin(priceMin);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(6);
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const [countProducts, setCountProducts] = useState(product.products.length);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar state={state} inFirstPage={() => setCurrentPage(1)} />
          <BrandBar inFirstPage={() => setCurrentPage(1)} />
          <PriceBar
            onChange={handlerMaxPriceChange}
            onChangeMin={handlerMinPriceChange}
            inFirstPage={() => setCurrentPage(1)}
          />
        </Col>
        <Col md={9}>
          <ProductList
            firstProductIndex={firstProductIndex}
            lastProductIndex={lastProductIndex}
            price={priceMax}
            priceMin={priceMin}
            totalProducts={(count) => setCountProducts(count)}
          />
          <Pages
            currentPage={currentPage}
            paginate={paginate}
            productPerPage={productPerPage}
            totalProducts={countProducts}
          />
        </Col>
      </Row>
    </Container>
  );
});

export default ProductPage;
