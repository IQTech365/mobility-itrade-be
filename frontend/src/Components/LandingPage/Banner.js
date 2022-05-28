import React, { useState } from "react";
import ModalVideo from "react-modal-video";

import BannerShape from "../../Assets/shapes/banner-shape-1-1.png";
import BannerBG from "../../Assets/resources/banner-image-1-1.jpg";
import BannerMoc from "../../Assets/resources/banner-moc-1-1.png";

const Banner = (props) => {
  const [open, setOpen] = useState({
    isOpen: false,
  });
  // const openModal = () => {
  //   setOpen({
  //     isOpen: true,
  //   });
  // };

  return (
    <section className="banner-one" id="home">
      <img src={BannerShape} className="banner-one__bg-shape-1" alt="" />
      <div
        className="banner-one__bg"
        style={{ backgroundImage: `url(${BannerBG})` }}
      ></div>
      <div className="container">
        <ModalVideo
          channel="youtube"
          isOpen={open.isOpen}
          videoId="Kl5B6MBAntI"
          onClose={() => setOpen({ isOpen: false })}
        />
        <div className="banner-one__video video-popup">
          <i className="fa fa-play"></i>
        </div>
        <div className="banner-one__moc">
          <img
            src={BannerMoc}
            className="wow fadeInUp"
            data-wow-duration="1500ms"
            alt=""
          />
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="banner-one__content">
              <form
                className="banner-one__mc-form mc-form"
                data-url="phone-number"
              >
                {/* <input
                  type="tel"
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                  required
                /> */}
                <button
                  className="thm-btn banner-one__mc-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    props.toggleShowPopup(true);
                  }}
                >
                  <span>Sign In</span>
                </button>
              </form>
              <div className="mc-form__response"></div>
              <h3>
                A Smarter Way <br /> To Attend <br /> Events
              </h3>
              <p>
                Invite people to celebrate your occasion. <br />
                So easy and convinient.
              </p>
              <a href="#" className="thm-btn banner-one__btn">
                <span>Discover More</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
