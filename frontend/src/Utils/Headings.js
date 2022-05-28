// import React, { useEffect, useState } from "react";
import Logo from "../Assets/Logo.svg";
import history from "./History";
export default function Headings(props) {
  // const [url, seturl] = useState("");
  // useEffect(() => {
  //   let urlstr = props.url.split("/");
  //   seturl(urlstr[1]);
  // }, []);

  return (
    <span className="black-t title-name">
      <img
        src={Logo}
        className="Logo"
        alt="logo"
        onClick={() => history.push("/home")}
      />
    </span>
  );

  //return <span className="black-t">{props.url}123</span>;
}
