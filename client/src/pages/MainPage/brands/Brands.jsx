import "./brands.scss";
import {
  Button,
  Card,
  Col,
  Container,
  Placeholder,
  Row,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { fetchBrands } from "../../../http/productAPI";
import { useEffect } from "react";
import { useState } from "react";
import { PRODUCT_ROUTE } from "../../../utils/consts";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands().then((data) => {
      setBrands(data.rows);
      setLoading(false)
    });
  }, []);

  if (loading) {
    return (
      <>
        <Container fluid className="brands_container_main">
          <Row className="d-flex w-100 justify-content-center">
            <Col className="d-flex w-100 justify-content-center">
              <p className="catalog_title">Выбери свой бренд...</p>
            </Col>
          </Row>
          <Row>
            <Swiper
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 4,
                },
                988: {
                  slidesPerView: 6,
                },
              }}
              spaceBetween={30}
              loop={true}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiperBrand"
            >
              <SwiperSlide>
                <Placeholder animation="glow" style={{ height: "200px" }}>
                  <Placeholder
                    className="placeholder"
                    style={{ height: "200px", borderRadius: "30px" }}
                    xs={12}
                  />
                </Placeholder>
              </SwiperSlide>

              <SwiperSlide>
                <Placeholder animation="glow" style={{ height: "200px" }}>
                  <Placeholder
                    className="placeholder"
                    style={{ height: "200px", borderRadius: "30px" }}
                    xs={12}
                  />
                </Placeholder>
              </SwiperSlide>
              <SwiperSlide>
                <Placeholder animation="glow" style={{ height: "200px" }}>
                  <Placeholder
                    className="placeholder"
                    style={{ height: "200px", borderRadius: "30px" }}
                    xs={12}
                  />
                </Placeholder>
              </SwiperSlide>
              <SwiperSlide>
                <Placeholder animation="glow" style={{ height: "200px" }}>
                  <Placeholder
                    className="placeholder"
                    style={{ height: "200px", borderRadius: "30px" }}
                    xs={12}
                  />
                </Placeholder>
              </SwiperSlide>
              <SwiperSlide>
                <Placeholder animation="glow" style={{ height: "200px" }}>
                  <Placeholder
                    className="placeholder"
                    style={{ height: "200px", borderRadius: "30px" }}
                    xs={12}
                  />
                </Placeholder>
              </SwiperSlide>
              <SwiperSlide>
                <Placeholder animation="glow" style={{ height: "200px" }}>
                  <Placeholder
                    className="placeholder"
                    style={{ height: "200px", borderRadius: "30px" }}
                    xs={12}
                  />
                </Placeholder>
              </SwiperSlide>
            </Swiper>
          </Row>
          <Row className="d-flex w-100 justify-content-center">
            <Col className="d-flex w-100 justify-content-center">
              <Button href={PRODUCT_ROUTE} className="btn_other_product">
                Другие бренды
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container fluid className="brands_container_main">
          <Row className="d-flex w-100 justify-content-center">
            <Col className="d-flex w-100 justify-content-center">
              <p className="catalog_title">Выбери свой бренд...</p>
            </Col>
          </Row>
          <Row>
            <Swiper
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 4,
                },
                988: {
                  slidesPerView: 6,
                },
              }}
              spaceBetween={30}
              loop={true}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiperBrand"
            >
              {brands?.map((elem) => (
                <SwiperSlide>
                  <Card
                    className="brand_card"
                    style={{
                      backgroundImage: `url(${
                        process.env.REACT_APP_API_URL + elem.img
                      })`,
                    }}
                  >
                    <Card.Body className="card_brand_main_body">
                      {elem.name}
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
          <Row className="d-flex w-100 justify-content-center">
            <Col className="d-flex w-100 justify-content-center">
              <Button href={PRODUCT_ROUTE} className="btn_other_product">
                Другие бренды
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Brands;
