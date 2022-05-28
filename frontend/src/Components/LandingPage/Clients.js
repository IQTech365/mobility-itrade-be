import React from "react";

import { Grid } from "@material-ui/core";
import Swiper from "react-id-swiper";
import BrandImage from "../../Assets/resources/brand-1-1.png";

const Clients = (props) => {
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
      <Grid container spacing={0}>
        <Swiper className="brand-one__carousel" {...params}>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
          <div className="item">
            <img src={BrandImage} alt="" />
          </div>
        </Swiper>
      </Grid>
    </section>
  );
};

export default Clients;
