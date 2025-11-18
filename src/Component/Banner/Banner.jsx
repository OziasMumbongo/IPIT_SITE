import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/dogs">
            <img src="images/Puppy.jpg" alt="Puppy" className="dog-image" /> 
          </Link>
            <h4>Dogs</h4>   
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/cats">
              <img src="images/cat-image.jpg" alt="cat" className="cat-image" />
          </Link>
              <h4>Cats</h4>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/fish">
              <img src="images/fish-image.jpg" alt="fish" className="fish-image" />
          </Link>
              <h4>Fish</h4>
        </SwiperSlide>
        
        <SwiperSlide>
          <Link to="/birds">
              <img src="images/bird-image.jpg" alt="bird" className="bird-image" />
          </Link>
              <h4>Bird</h4>
        </SwiperSlide>
        
        <SwiperSlide>
          <Link to="/small-pets">
              <img src="images/small-pets.jpg" alt="Small Pets" className="small-pets-image" />
          </Link>
              <h4>Small Pets</h4>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner
