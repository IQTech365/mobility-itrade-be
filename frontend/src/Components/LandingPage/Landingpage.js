import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/swiper-bundle.min.css";
import "react-modal-video/css/modal-video.min.css";
import "./css/Landingpage.css";
import "./css/animate.min.css";
import "./css/apton-icons.css";
import "./css/style.css";
import "./css/responsive.css";
import "./css/fontawesome-all.min.css";
import LoginSignup from "../Auth/LoginSignup";
import Banner from "./Banner";
import Clients from "./Clients";
import Contact from "./Contact";
import CTAOne from "./CTAOne";
import CTATwo from "./CTATwo";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Header from "./Header";
import Layout from "./Layout";
import MobileMenu from "./MobileMenu";
import Pricing from "./Pricing";
import Services from "./Services";
import Testimonials from "./Testimonials";
import VideoOne from "./VideoOne";
import Popup from "../Helpers/Popups/Popup";
import { useSelector, useDispatch } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import history from "../../Utils/History";
import { loginuser } from "../../Redux/DispatchFuncitons/AuthFunctions";
export default function Landingpage() {
  const [showPopup, toggleShowPopup] = useState(false);
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    let ischeck = reactLocalStorage.get("isLoggedIn");
    let Phone = reactLocalStorage.get("Phone");
    // let Token = reactLocalStorage.get("Token", true);
    if (ischeck === false || ischeck === undefined || ischeck === "") {
      console.log("push");
      history.push("/");
    } else {
      console.log("loginuser");
      dispatch(loginuser(Phone));
    }
  }, []);
  return (
    <div>
      <Popup
        toggleShowPopup={toggleShowPopup}
        showPopup={showPopup}
        component={LoginSignup}
      />
      <Layout pageTitle="Mobilly Invite">
        <Header
          btnClass="main-nav__btn"
          extraClassName="site-header-one__fixed-top"
          toggleShowPopup={toggleShowPopup}
        />
        <MobileMenu />
        <Banner toggleShowPopup={toggleShowPopup} />
        <Services />
        <CTAOne />
        <CTATwo />
        <Pricing />
        <Testimonials />
        <Clients />
        <VideoOne />
        <br />
        <br />
        <FAQ />
        <Contact />
        <Footer />
      </Layout>
    </div>
  );
}
