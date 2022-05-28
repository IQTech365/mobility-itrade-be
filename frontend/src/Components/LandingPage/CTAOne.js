import React from "react";
import BlockTitle from "./BlockTitle";

import CtaShape1 from "../../Assets/shapes/cta-1-shape-1.png";
import CtaShape2 from "../../Assets/shapes/cta-1-shape-2.png";
import CtaMoc1 from "../../Assets/resources/cta-1-moc-1.png";

const CTAOne = () => {
  return (
    <section className="cta-one">
      <img src={CtaShape1} className="cta-one__bg-shape-1" alt="" />
      <img src={CtaShape2} className="cta-one__bg-shape-2" alt="" />
      <div className="container">
        <div className="cta-one__moc wow fadeInLeft" data-wow-duration="1500ms">
          <img src={CtaMoc1} className="cta-one__moc-img" alt="" />
        </div>
        <div className="row justify-content-end">
          <div className="col-lg-6">
            <div className="cta-one__content">
              <BlockTitle
                textAlign="left"
                paraText="More Features"
                titleText={`Manage Multiple Events \n Simultaneously`}
              />
              <div className="cta-one__text">
                <p>
                  Personal Events, Birthdays, Weddings, Destination Events and
                  in Just One Platform.
                </p>
              </div>
              <ul className="list-unstyled cta-one__list">
                <li>
                  <i className="fa fa-check-circle"></i>
                  Easy to Create in 5 Minutes
                </li>
                <li>
                  <i className="fa fa-check-circle"></i>
                  Social Timeline for Events
                </li>
                <li>
                  <i className="fa fa-check-circle"></i>
                  Customise and Invite at GO
                </li>
              </ul>
              <a href="#" className="thm-btn cta-one__btn">
                <span>Create Events</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAOne;
