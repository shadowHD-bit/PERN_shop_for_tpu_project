import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.scss";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { Context } from "../../..";

export default function Slider() {
  const { slider } = useContext(Context);

  return (
    <>
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
        {slider.sliders.map(
          (sliderItem) => (
            <SwiperSlide>
              <div className="content_slider" style={{display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent: 'center', backgroundImage: `url(${process.env.REACT_APP_API_URL +sliderItem.img})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', height:'100%'}}>
                <div className="text_content" style={{padding: '0px 100px'}}>
                  <h2 style={{color: 'white'}}>{sliderItem.title}</h2>
                  <h4 style={{color: 'white'}}>{sliderItem.text}</h4>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
}
