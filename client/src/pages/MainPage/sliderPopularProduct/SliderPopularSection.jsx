import 'bootstrap/dist/css/bootstrap.min.css';
import './sliderPopular.scss';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import { useContext, useEffect } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { fetchBrands, fetchProduct, fetchTypes } from '../../../http/productAPI';
import ProductItem from '../../../components/productItem/ProductItem';
import { Button, Card, Container, Row } from 'react-bootstrap';


const SliderPopular = observer(() => {

  const {product} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data));
    fetchBrands().then(data => product.setBrands(data));
    fetchProduct(null, null, 1, 9).then(data => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
}, []);

    return (
      <div className="sliderPopular">
          <div className='titlePopular'>
              <h3 className='title text-center'>Популярные товары</h3>
              <h3 className='title_arrow text-center'>________________________</h3>
          </div>
        
        <div className='card_popular'>
        
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
          slideShadows: false
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {product.products.map(product =>
          <SwiperSlide>
            <Card>
                    <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.imgMain} />
                    <Card.Body>
                      <Card.Title>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                          {product.name}
                          {product.rating}
                        </div>
                      </Card.Title>
                        <Button variant="outline-danger">Перейти</Button>
                    </Card.Body>
                </Card>
          </SwiperSlide>
        )}
      </Swiper>

        
        </div>

      </div>
    );
  })
  
export default SliderPopular;
  