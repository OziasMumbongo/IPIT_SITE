import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Swipper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Swipper = () => {
  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3400,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="images/swipper2.jpg" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/swiper.jpg" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/swiper3.jpg" alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">Slide 4</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">Slide 5</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Swipper;
