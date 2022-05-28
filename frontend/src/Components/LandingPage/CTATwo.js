import React from "react";
import BlockTitle from "./BlockTitle";

import CTAImage1 from "../../Assets/resources/cta-2-moc-1.png";
import CTAImage2 from "../../Assets/resources/cta-2-moc-2.png";
import CTAImage3 from "../../Assets/resources/cta-2-moc-3.png";

const CTATwo = () => {
  return (
    <section className="cta-two">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="cta-two__content">
              <BlockTitle
                textAlign="left"
                paraText="Feature List"
                titleText={`Minvitd Providing You \n Best Features`}
              />
              <div className="cta-two__icon-wrap">
                <div className="cta-two__icon-single">
                  <div className="cta-two__icon">
                    <i className="far fa-comment-alt"></i>
                  </div>
                  <h3>
                    In App <br /> Messages
                  </h3>
                </div>
                <div className="cta-two__icon-single">
                  <div className="cta-two__icon">
                    <i className="fas fa-hashtag"></i>
                  </div>
                  <h3>
                    Social <br /> Media
                  </h3>
                </div>
              </div>
              <div className="cta-two__text">
                <p>
                  Engage with your events members with ease, with social media
                  like timeline and high-quality video conferencing. More
                  features to be discover by you ;)
                </p>
              </div>
              <a href="#" className="thm-btn cta-two__btn">
                <span>Discover More</span>
              </a>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="cta-two__images d-flex justify-content-end align-items-end flex-column">
              <img
                src={CTAImage1}
                className="wow fadeInUp"
                data-wow-duration="1500ms"
                alt=""
              />
              <img
                src={CTAImage2}
                className="wow fadeInUp"
                data-wow-duration="1500ms"
                alt=""
              />
              <img
                src={CTAImage3}
                className="wow fadeInUp"
                data-wow-duration="1500ms"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTATwo;
