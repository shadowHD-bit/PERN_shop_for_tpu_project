import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Slider.scss";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { Context } from "../../..";
import { Col, Container, Placeholder, Row, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { fetchSlider } from "../../../http/sliderAPI";

export default function Slider() {
  const { slider } = useContext(Context);

  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlider().then((data) => {
      setSliderData(data);
      setLoading(false)
    });
  }, []);

  if (loading) {
    return (
      <>
        <Container className="slider_container">
          <Row>
            <Col>
            <Placeholder animation="glow" style={{height: '720px'}}>
            <Placeholder style={{height: '720px', borderRadius: '30px'}} xs={12} />
          </Placeholder>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container className="slider_container">
          <Row>
            <Col>
              <Swiper
                speed={1000}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                {sliderData?.map((sliderItem) => (
                  <SwiperSlide>
                    <div
                      className="content_slider"
                      style={{
                        backgroundImage: `url(${
                          process.env.REACT_APP_API_URL + sliderItem.img
                        })`,
                      }}
                    >
                      <div
                        className="text_content"
                        style={{ padding: "0px 100px" }}
                      >
                        <h1 style={{ color: "white", fontWeight: "bold" }}>
                          {sliderItem.title}
                        </h1>
                        <h4 style={{ color: "white", fontWeight: "bold" }}>
                          {sliderItem.text}
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
