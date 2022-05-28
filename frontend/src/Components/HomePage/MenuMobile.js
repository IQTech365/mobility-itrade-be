import React from "react";
import NavLinks from "./NavLinks";
import CloseBtn from "../../Assets/shapes/close-1-1.png";

const MenuMobile = () => {
  return (
    <div className="side-menu__block">
      <div className="side-menu__block-overlay custom-cursor__overlay">
        <div className="cursor"></div>
        <div className="cursor-follower"></div>
      </div>
      <div className="side-menu__block-inner ">
        <div className="side-menu__top justify-content-end">
          <a href="#" className="side-menu__toggler side-menu__close-btn">
            <img src={CloseBtn} alt="" />
          </a>
        </div>

        <nav className="mobile-nav__container">
          <NavLinks />
        </nav>
        <div className="side-menu__sep"></div>
        <div className="side-menu__content">
          <p>
            Lorem Ipsum is simply dummy text the printing and setting industry.
            Lorm Ipsum has been the industry's stanard dummy text ever.
          </p>
          <p>
            <a href="mailto:teammobillyinvite@gmail.com">
              teammobillyinvite@gmail.com
            </a>
            <br />
            <a href="tel:9348689987">+91-9348689987</a>
          </p>
          <div className="side-menu__social">
            <a href="#">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
