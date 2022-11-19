import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchTypes } from "../../../http/productAPI";
import { PRODUCT_ROUTE } from "../../../utils/consts";
import "./lightbox.scss";

const Lightbox = () => {
  const [type, setType] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => {
      setType(shuffle(data.rows));
    });
  }, []);

  function shuffle(array) {
    var ctr = array.length,
      temp,
      index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
    }
    return array;
  }

  return (
    <>
      <Container className="catalog_container">
        <Row>
          <Col>
            <p className="catalog_title">Выбери свой стиль...</p>
          </Col>
        </Row>
        <Row>
          {type?.slice(0, 6).map((elem) => (
            <Col xs={12} md={6} xl={4} key={elem.id}>
              <Link to={PRODUCT_ROUTE} state={{id: elem.id, name: elem.name}}>
                <Card
                  className="card_product_main"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + elem.img
                    })`,
                  }}
                >
                  <Card.Body className="card_product_main_body">
                    {elem.name}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Row className="d-flex w-100 justify-content-center">
          <Col className="d-flex w-100 justify-content-center">
            <Button href={PRODUCT_ROUTE} className="btn_other_product">
              Другие товары
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Lightbox;
