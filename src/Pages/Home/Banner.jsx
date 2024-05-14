import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

const Banner = () => {


    return (<>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >

                <SwiperSlide>
                    <img className='w-full h-52 lg:h-96 mx-auto' src="https://i.ibb.co/X2JSX5V/istockphoto-624695614-1024x1024.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-52 lg:h-96 mx-auto' src="https://i.ibb.co/YjMB03d/istockphoto-1516347004-1024x1024.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-52 lg:h-96 mx-auto' src="https://i.ibb.co/g39J0nP/istockphoto-905029096-1024x1024.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-52 lg:h-96 mx-auto' src="https://i.ibb.co/BTVSn3W/jason-goodman-vbxy-Fxlgpj-M-unsplash.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
    </>


    );
};

export default Banner;



