import React from "react";
import "./styles.css";
import DanceIcon from "../../Assets/DanceIcon.png"
import Swiper from "react-id-swiper";
import HappyIcon from "../../Assets/Group 4317.png"
import celebrateslide from "../../Assets/celebrateslide.jpg"
import birthdayslide from "../../Assets/birthdayslide.jpg"


export default function AboutBanner() {
  return (
    <Swiper>
      <div className="personal_area py-75" style={{ marginTop: 20 }}>
        <div className="container">
          <div className="owl-carousel owl-theme owlPresonalArea">
            <div className="item">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={celebrateslide}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <h2 className=" font-weight-bold">Personal Events</h2>
                  <p className="text-secondary">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="personal_area py-75">
        <div className="container">
          <div className="owl-carousel owl-theme owlPresonalArea">
            <div className="item">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={birthdayslide}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <h2 className="font-weight-bold">Video Conferencing</h2>
                  <p className="text-secondary">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Swiper>
  )
}


