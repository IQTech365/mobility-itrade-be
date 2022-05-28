import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import Geocode from "react-geocode";
import { Accordion, Card, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../Helpers/Header/Header.js";
import "../Location Offline/LocationOffline.css";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import VideocamIcon from "@material-ui/icons/Videocam";
import { useSelector, useDispatch } from "react-redux";
import { json } from "body-parser";
import vcimage from "../../Assets/videocall.png";
import history from "../../Utils/History";
import { GoogleMapsAPI } from "../../Utils/Config";
import { IoArrowBackCircleOutline } from "react-icons/io5";
const libraries = ["places"];

const options = {
  // styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  gestureHandling: "cooperative",
};

export default function Location(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GoogleMapsAPI,
    libraries,
  });
  // const Eventdata = useSelector(
  //   (state) =>
  //     state.Eventdata.myInvitations[props.match.params.id][
  //       props.match.params.event
  //     ]
  // );

  let Eventdata = [];
  let base = "";
  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents[props.match.params.id]
  );

  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations[props.match.params.id]
  );
  console.log(props.location.pathname);
  if (
    props.location.pathname ===
    "/MyEvents/location/" +
    props.match.params.id +
    "/" +
    props.match.params.event
  ) {
    Eventdata = MyEvents[props.match.params.event];
    base = "MyEvents";
  } else {
    Eventdata = myInvitations[props.match.params.event];
    base = "inv";
  }

  let center = {};
  if (Eventdata.VenueType === "Both" || Eventdata.VenueType === "Offline") {
    let locationdata = JSON.parse(Eventdata.Location);
    center = {
      lat: locationdata.lat,
      lng: locationdata.lng,
    };
  } else {
    center = {
      lat: 20.5937,
      lng: 78.9629,
    };
  }

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
    border: "solid",
    display:
      Eventdata.VenueType === "Offline" || Eventdata.VenueType === "Both"
        ? "block"
        : "none",
  };
  console.log(Eventdata);
  Geocode.setApiKey("AIzaSyDGvvMy7XFQMmNOKRraAjoFcjHcVElEblo");

  Geocode.setLanguage("en");

  const [marker, setMarker] = useState(center);
  const [selected, setSelected] = useState(null);
  const [adderss, setAddress] = useState("");
  const [Location, setLocation] = useState("");

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    let location = JSON.stringify({ lat, lng });
    console.log(location);

    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(70);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <div className="desktop-only w-100" >
        <Header className="desktop-only" />
      </div>
      <Col className="mt-15px">
        <p style={{ fontWeight: 700, fontSize: 23 }}>
          <IoArrowBackCircleOutline
            size={40}
            onClick={() => {
              history.goBack();
            }}
          />
          Location
        </p>
      </Col>
      <img
        src={vcimage}
        style={{
          width: "100vw",
          height: "70vh",
          objectFit: "contain",
          display:
            Eventdata.VenueType === "Online" ||
              Eventdata.VenueType === "Online-Inapp"
              ? "block"
              : "none",
        }}
      />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
        options={{ scrollwheel: false }}
      >
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
        />

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{adderss}</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>

      <Accordion>
        <Card>
          <Card.Header
            style={{
              display:
                Eventdata.VenueType === "Offline" ||
                  Eventdata.VenueType === "Both"
                  ? "block"
                  : "none",
            }}
          >
            <a
              href={"http://maps.google.com?q=" + center.lat + "," + center.lng}
            >
              <Accordion.Toggle
                eventKey="-1"
                style={{
                  color: "skyblue",
                  height: "100%",
                  width: "100%",
                  border: "none",
                  background: "none",
                  color: "#000",
                  textAlign: "left",
                }}
              >
                <LocationOnOutlinedIcon style={{ color: "skyblue" }} />
                Directions
              </Accordion.Toggle>
            </a>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body
              style={{
                margin: 0,
                padding: 0,
                display:
                  Eventdata.VenueType === "Offline" ||
                    Eventdata.VenueType === "Both"
                    ? "block"
                    : "none",
              }}
            ></Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header
            style={{
              display:
                Eventdata.VenueType === "Online" ||
                  Eventdata.VenueType === "Both" ||
                  Eventdata.VenueType === "Online-Inapp"
                  ? "block"
                  : "none",
            }}
          >
            <Accordion.Toggle
              eventKey="1"
              style={{
                color: "skyblue",
                height: "100%",
                width: "100%",
                border: "none",
                background: "none",
                color: "#000",
                textAlign: "left",
              }}
              onClick={() => {
                if (Eventdata.VenueType === "Online") {
                  window.open(Eventdata.Link);
                } else if (
                  Eventdata.VenueType === "Online-Inapp" ||
                  Eventdata.VenueType === "Both"
                ) {
                  history.push("/inv/videoconf/" + Eventdata.eventCode);
                }
              }}
            >
              <VideocamIcon style={{ color: "skyblue" }} /> Join Meeting
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body
              style={{
                display:
                  Eventdata.VenueType === "Online" ||
                    Eventdata.VenueType === "Both" ||
                    Eventdata.VenueType === "Online-Inapp"
                    ? "block"
                    : "none",
              }}
            ></Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header
            style={{
              display:
                Eventdata.VenueType === "Offline" ||
                  Eventdata.VenueType === "Both"
                  ? "block"
                  : "none",
            }}
          >
            <Accordion.Toggle
              eventKey="2"
              style={{
                color: "skyblue",
                height: "100%",
                width: "100%",
                border: "none",
                background: "none",
                color: "#000",
                textAlign: "left",
              }}
            >
              <LocationOnOutlinedIcon style={{ color: "skyblue" }} /> Other
              <KeyboardArrowDownIcon
                style={{ float: "right", color: "skyblue" }}
              />
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="2">
            <Card.Body
              style={{
                display:
                  Eventdata.VenueType === "Offline" ||
                    Eventdata.VenueType === "Both"
                    ? "block"
                    : "none",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
