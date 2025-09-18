import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Banner.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Banner = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper1"
      >
        <SwiperSlide className='swiperslide'>
            <img src="images/Puppy.jpg" alt="Puppy" /> 
            <h4>Dogs</h4>   
        </SwiperSlide>
        <SwiperSlide>
              <img src="images/cat-image.jpg" alt="cat" />
              <h4>Cats</h4>
        </SwiperSlide>
        <SwiperSlide>
              <img src="images/fish-image.jpg" alt="fish" />
              <h4>Fish</h4>
        </SwiperSlide>
        <SwiperSlide>
              <img src="images/bird-image.jpg" alt="bird" />
              <h4>Bird</h4>
        </SwiperSlide>
        <SwiperSlide>
              <img src="images/small-pets.jpg" alt="Puppy" />
              <h4>Small Pets</h4>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner
