import "bootstrap/dist/css/bootstrap.min.css";
import "./sliderPopular.scss";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import { useContext, useEffect } from "react";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import {
  fetchBrands,
  fetchProduct,
  fetchTypes,
} from "../../../http/productAPI";
import { Button, Card, Container, Row } from "react-bootstrap";
import { PRODUCT_ROUTE } from "../../../utils/consts";
import { AiOutlineStar } from "react-icons/ai";

const SliderPopular = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProduct(null, null, 1, 9).then((data) => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
  }, []);

  let sort = (a, b) => (a.rating < b.rating ? 1 : -1);

  return (
    <div className="sliderPopular">
      <div className="titlePopular">
        <h3 className="title text-center">Популярные товары</h3>
        <h3 className="title_arrow text-center">________________________</h3>
      </div>

      <div className="card_popular">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {product.products
            .slice()
            .sort(sort)
            .map(
              (
                product //{product.products.slice().sort(sort).splice(1, 1).map((product) => добавить для ограничения
              ) => (
                <SwiperSlide>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={process.env.REACT_APP_API_URL + product.imgMain}
                    />
                    <Card.Body>
                      <Card.Title>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          {product.name}
                          <div
                            className="rating"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <span>
                              <AiOutlineStar className="ml-1" /> Рейтинг:{" "}
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </Card.Title>
                      <Button
                        href={PRODUCT_ROUTE + "/" + product.id}
                        variant="outline-danger"
                      >
                        Посмотреть
                      </Button>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              )
            )}
        </Swiper>
      </div>
    </div>
  );
});

export default SliderPopular;
