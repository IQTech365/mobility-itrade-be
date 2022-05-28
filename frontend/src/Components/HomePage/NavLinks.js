import React, { useState, useEffect } from "react";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const NavLinks = () => {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const handleDropdownStatus = () => {
    setDropdownStatus(!dropdownStatus);
    console.log(dropdownStatus);
  };
  return (
    <ul className="main-nav__navigation-box">
      <li>{/* <Link href="/">
          <a>Home</a>
        </Link> */}</li>
      <li>
        <ScrollLink
          activeClass="current"
          to="features"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Features
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          activeClass="current"
          to="pricing"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Pricing
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          activeClass="current"
          to="contactme"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Contact
        </ScrollLink>
      </li>
    </ul>
  );
};

export default NavLinks;
