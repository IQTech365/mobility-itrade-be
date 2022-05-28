import React from "react";
import "./styles.css";

import { FaTwitter, FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa"


export default function Footer() {
  return (
    <footer
      className="footer_wrap p-4 mt-3"
      style={{ background: "#1F1F1F", marginTop: 50 }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-5 text-md-left text-center mb-2 mb-md-0">
            <p className="text-white mb-0">
              Copyright @ 2020, All Rights Reserved for minvitd.com
            </p>
          </div>
          <div className="col-md-2 text-center">
            {" "}
            <a href="#" className="text-white">
              Terms &amp; Conditions
            </a>{" "}
          </div>
          <div className="col-md-3 text-center">
            {" "}
            <a href="#" className="text-white">
              Privacy &amp; policy
            </a>{" "}
          </div>
          <div className="col-md-2 text-right">
            <div className="justify-content-center justify-content-md-end d-flex flex-row">
              <a href="#" className="ml-3 text-white">
                <FaFacebookF size='20' />
              </a>
              <a href="#" className="ml-3 text-white">
                <FaTwitter size='20' />
              </a>
              <a href="#" className="ml-3 text-white">
                <FaWhatsapp size='20' />
              </a>
              <a href="#" className="ml-3 text-white">
                <FaInstagram size='20' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
