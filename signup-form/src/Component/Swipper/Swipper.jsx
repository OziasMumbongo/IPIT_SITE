import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './Swipper.css';

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const Swipper = () => {
  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3800,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect="fade"             
        fadeEffect={{ crossFade: true }}

        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="images/swiper-image.jpg" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/swiper-image2.jpg" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/swiper-image3.jpg" alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/swiper-image4.jpg" alt="Slide 4" />
        </SwiperSlide>
        <SwiperSlide>
         <img src="images/swiper-image5.jpg" alt="Slide 5" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Swipper;
