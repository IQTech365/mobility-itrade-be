import React from "react";
import Swiper from "react-id-swiper";
import BrandImage from "../../Assets/resources/brand-1-1.png";
import './styles.css'
import ZoomIcon from "../../Assets/logo_zoom.png";


export default function CompanySlide() {
  const params = {
    speed: 1000,
    spaceBetween: 100,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 5,
    rebuildOnUpdate: true,
    // Responsive breakpoints
    breakpoints: {
      0: {
        spaceBetween: 30,
        slidesPerView: 2,
      },
      767: {
        spaceBetween: 30,
        slidesPerView: 3,
      },
      991: {
        spaceBetween: 50,
        slidesPerView: 4,
      },
      1499: {
        slidesPerView: 5,
      },
    },
  };

  return (
    <section className="brand-one">

      <Swiper className="brand-one__carousel" {...params}>
        <div>
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
        <div >
          <img src={BrandImage} alt="" />
        </div>
      </Swiper>

    </section>
  )
}
