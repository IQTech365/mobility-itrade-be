import React from "react";
import BlockTitle from "./BlockTitle";

const Services = () => {
  return (
    <section className="service-one" id="features">
      <div className="container">
        <BlockTitle
          textAlign="center"
          paraText="Feature List"
          titleText={`Mobilly Invite Providing You \n Best Features`}
        />
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="service-one__single">
              <div className="service-one__inner">
                <div className="service-one__circle"></div>
                <div className="service-one__icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>No App Required</h3>
                <p>No Download, Start Immediately!</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="service-one__single">
              <div className="service-one__inner">
                <div className="service-one__circle"></div>
                <div className="service-one__icon">
                  <i className="fas fa-user-friends"></i>
                </div>
                <h3>Unlimited Guests</h3>
                <p>Large Family, No Problems!</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="service-one__single">
              <div className="service-one__inner">
                <div className="service-one__circle"></div>
                <div className="service-one__icon">
                  <i className="fas fa-envelope-open-text"></i>
                </div>
                <h3>RSVP</h3>
                <p>Repondez, s'il vous plaît'</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="service-one__single">
              <div className="service-one__inner">
                <div className="service-one__circle"></div>
                <div className="service-one__icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Schedule Location</h3>
                <p>Access Anytime & Anywhere!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
