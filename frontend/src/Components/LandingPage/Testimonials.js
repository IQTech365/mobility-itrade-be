import React from "react";
import SwiperCore, { Pagination, Thumbs, Controller } from "swiper";

import Swiper from "react-id-swiper";
import BlockTitle from "./BlockTitle";
import { Grid } from "@material-ui/core";
import TestiQoute from "../../Assets/shapes/testi-qoute-1-1.png";
import TestiImageOne from "../../Assets/resources/testi-1-1.jpg";
import TestiImageTwo from "../../Assets/resources/testi-1-2.jpg";
import TestiImageThree from "../../Assets/resources/testi-1-3.jpg";
SwiperCore.use([Pagination, Thumbs, Controller]);
const Testimonials = (props) => {
  const paramsTwo = {
    observer: true,
    observeParents: true,
    speed: 1400,
    mousewheel: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonials-one__pagination-wrap .swiper-pagination",
      clickable: true,
    },
  };

  const paramsOne = {
    slidesPerView: 1,
    spaceBetween: 0,
    effect: "fade",
    speed: 1400,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  };

  return (
    <section className="testimonials-one">
      <Grid container spacing={12}>
        <Grid item md={6}>
          <div className="testimonials-one__thumb-carousel-wrap">
            <div className="testimonials-one__icon">
              <div className="testimonials-one__icon-inner">
                <img src={TestiQoute} alt="" />
              </div>
            </div>
            <div className="testimonials-one__thumb-carousel">
              <Swiper {...paramsOne}>
                <div className="swiper-slide">
                  <div className="testimonials-one__image">
                    <img src={TestiImageOne} alt="Awesome Image" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-one__image">
                    <img src={TestiImageTwo} alt="Awesome Image" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-one__image">
                    <img src={TestiImageThree} alt="Awesome Image" />
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className="d-flex">
          <div className="my-auto">
            <BlockTitle
              textAlign="left"
              paraText="Our Testimonials"
              titleText={`What Our Customers Are \n Talking About`}
            />
            <div className="testimonials-one__carousel">
              <Swiper {...paramsTwo}>
                <div className="swiper-slide">
                  <div className="testimonials-one__single">
                    <p className="testimonials-one__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus tristique eros ante. Pellentesque ultrices
                      scelerisque eros tristique interdum. Donec imperdiet
                      tincidunt massa, eget viverra turpis facilisis ac.
                    </p>

                    <h3 className="testimonials-one__title">Soubhagya</h3>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-one__single">
                    <p className="testimonials-one__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus tristique eros ante. Pellentesque ultrices
                      scelerisque eros tristique interdum. Donec imperdiet
                      tincidunt massa, eget viverra turpis facilisis ac.
                    </p>

                    <h3 className="testimonials-one__title">Soubhagya</h3>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-one__single">
                    <p className="testimonials-one__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus tristique eros ante. Pellentesque ultrices
                      scelerisque eros tristique interdum. Donec imperdiet
                      tincidunt massa, eget viverra turpis facilisis ac.
                    </p>

                    <h3 className="testimonials-one__title">Soubhagya</h3>
                  </div>
                </div>
              </Swiper>
              <div className="testimonials-one__pagination-wrap">
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default Testimonials;
