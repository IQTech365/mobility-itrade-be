import React, { useState, useEffect } from "react";
import "./styles.css";
import ContactImg from "../../Assets/ContactImg.png";
import { db } from "./Firebase";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact_us py-75" style={{ marginTop: 50 }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-end">
            <img src={ContactImg} alt="img" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2 className="font-weight-bold mb-4">Contact Us</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label
                  className="font-weight-bold text-black-50"
                  htmlFor="Name"
                >
                  Name
                </label>
                <input
                  className="form-control contact_field"
                  value={name}
                  placeholder="Enter your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  className="font-weight-bold text-black-50"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  className="form-control contact_field"
                  value={email}
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  className="font-weight-bold text-black-50"
                  htmlFor="Message"
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  className="form-control contact_field"
                  value={message}
                  placeholder="Enter your Message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 rounded-pill mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
