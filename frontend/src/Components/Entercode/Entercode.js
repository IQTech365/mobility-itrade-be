import React, { useState } from "react";
import check from "../../Assets/check-circle.1.png";
import history from "../../Utils/History";
import eventimage from "../../Assets/eventimage.png";
import { useDispatch } from "react-redux";
import { addme } from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function Entercode(props) {
  const [code, setcode] = useState("");
  const [iserror, setiserror] = useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      <img
        src={eventimage}
        className="rounded mx-auto d-block"
        style={{ height: 100, width: 100 }}
      />
      {/* <h4
        style={{
          float: "left",
          marginTop: 60,
          fontWeight: "bold",
          fontStretch: "normal",
          fontStyle: "normal",
          fontSize: 16,
          marginLeft: 5,
        }}
      >
        Enter Code
      </h4>
      <input
        className="form-control form-control-sm"
        type="text"
        placeholder="Code"
        style={{
          borderRadius: 30,
          margin: "10px 0.2px 4.8px 0",
          height: "40px",
        }}
        value={code}
        onChange={(e) => {
          setcode(e.target.value);
        }}
      />
      {iserror === true ? (
        <span className="error">please enter valid code</span>
      ) : (
        <></>
      )}

      <button
        type="button"
        className="btn btn-primary mt-3 p-2"
        style={{ width: "100%", borderRadius: 50, fontWeight: "bold" }}
        onClick={async () => {
          if (code !== "") {
            setiserror(false);
            await dispatch(addme(code));

            props.hide(false);
          } else {
            setiserror(true);
          }
        }}
      >
        Use Code
      </button>  <h6 style={{ textAlign: "center", marginTop: "10px" }}>OR</h6> */}

      <br />

      <button
        type="button"
        className="btn btn-primary mt-1 p-2 createevent"
        style={{
          width: "100%",
          borderRadius: 50,
          fontWeight: "bold",
          marginBottom: "20px",
        }}
        onClick={() => {
          history.push("/MyEvents/add-event");
        }}
      >
        Create Event
      </button>
    </div>
  );
}
