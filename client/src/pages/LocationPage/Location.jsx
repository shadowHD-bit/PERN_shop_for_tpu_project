import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";
import { fetchLocations } from "../../http/locationAPI";
import "./Location.scss";
import MapComponent from "./MapComponent";
const mapState = {
  center: [55.345304, 86.099415],
  zoom: 5,
};

const Location = () => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocation(data.rows);
    });
  }, []);

  if (location.length == 0) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <h1 className="spinner__text">To Be Sure Yourself....</h1>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  } else {
    return (
      <>
        <Container className="map_container">
          <Row className="d-flex flex-row align-items-center">
            <Col xs={4}>
              <Row>
                <Col className="d-flex flex-row align-items-center justify-content-center">
                  <Image
                    src={
                      process.env.PUBLIC_URL + "/img/productcard/tea-time.png"
                    }
                    width={250}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <p className="text_info">
                    На данной карте отмечены основные места расположения нашего
                    магазина.
                  </p>
                  <p className="text_info">
                    Вы в любой момент можете прийти к нам и задать интересующие
                    вас вопросы напрямую...
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={8}>
              <div className="listShop">
                <MapComponent location={location} />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default Location;
