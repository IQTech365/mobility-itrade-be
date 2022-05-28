import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "./Maps.css";
import "@reach/combobox/styles.css";
import Geocode from "react-geocode";
let mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "2.00",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#9c9c9c",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7b7b7b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#46bcec",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#c8d7d4",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#070707",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];

const libraries = ["places"];
const mapContainerStyle = {
  height: "400px",
  width: "100%",
  border: "solid",
  display: "none",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  gestureHandling: "cooperative",
};
const center = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDGvvMy7XFQMmNOKRraAjoFcjHcVElEblo",
    libraries,
  });

  Geocode.setApiKey("AIzaSyDGvvMy7XFQMmNOKRraAjoFcjHcVElEblo");

  Geocode.setLanguage("en");
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [adderss, setAddress] = useState("");
  const [Location, setLocation] = useState("");
  useEffect(() => {
    try {
      let data = JSON.parse(props.CurrentEventDetails.location);
      setAddress(data.Location);
      setLocation(data.Location);
    } catch (err) {
      setLocation("");
    }
  }, []);

  const onMapClick = useCallback(async (e) => {
    let lat = e.latLng.lat();
    let long = e.latLng.lng();
    setMarkers((current) => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
      (response) => {
        const faddress = response.results[0].formatted_address;

        setAddress(faddress);

        let location = JSON.stringify({ lat, long, faddress });
        console.log({
          ...props.CurrentEventDetails,
          Location: location,
        });
        // props.setLocation(location);
        // if (props.CurrentEventDetails.VenueType === "Offline") {
        //   props.SetCurrentEventDetails({
        //     ...props.CurrentEventDetails,
        //     Location: location,
        //     Link: "",
        //   });
        // } else {
        //   props.SetCurrentEventDetails({
        //     ...props.CurrentEventDetails,
        //     Location: location,
        //   });
        // }

        console.log(faddress);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    let location = JSON.stringify({ lat, lng });
    console.log(location);

    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1></h1>

      <Search
        panTo={panTo}
        Location={Location}
        CurrentEventDetails={props.CurrentEventDetails}
        SetCurrentEventDetails={props.SetCurrentEventDetails}
        setLocation={props.setLocation}
      />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={{ scrollwheel: false }}
        style={{ display: "none" }}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

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
    </div>
  );
}

function Search(props) {
  console.log(props);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      debugger
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      props.panTo({ lat, lng });
      console.log(results);
      let location = await JSON.stringify({ lat, lng, address });

      if (props.CurrentEventDetails.VenueType === "Offline") {
        await props.SetCurrentEventDetails({
          ...props.CurrentEventDetails,
          Location: location,
          Link: "",
        });
      } else {
        await props.SetCurrentEventDetails({
          ...props.CurrentEventDetails,
          Location: location,
        });
      }
      props.setisEditLocation(false)
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="w-90">
      <Combobox
        onSelect={async (address) => { await handleSelect(address); await props.setLocation(address) }}
        CurrentEventDetails={props.CurrentEventDetails}
        setCurrentEventDetails={props.setCurrentEventDetails}
      >
        <span
          className={
            props.CurrentEventDetails.VenueType === "Offline"
              ? "label top-5"
              : "label"
          }
        >
          Location
        </span>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          Placeholder="Search your location"
          className={"locationSearch"}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div >
  );
}
