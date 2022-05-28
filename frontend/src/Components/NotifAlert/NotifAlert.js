import React from "react";
import "bootstrap";

class NotifAlert extends React.Component {
  render() {
    return (
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#modalnext"
        >
          Notification Alerts
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="modalnext"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="successModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog commonModal" role="document">
            <div className="modal-content" style={{ borderRadius: 36 }}>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img
                  src="assets/images/Cross.png"
                  aria-hidden="true"
                  className="modalclose"
                  style={{
                    float: "right",
                    width: "27.9px",
                    height: "27.9px",
                    marginRight: 20,
                    marginTop: 20,
                  }}
                />
              </button>
              <div className="modal-body  ">
                <div className="NotificationsAlerts p-5">
                  <h4 className="pb-3" style={{ fontWeight: "bold" }}>
                    Notifications Alerts
                  </h4>
                  <br />
                  <div
                    className="Alerts-box1  p-3 mb-3"
                    style={{
                      boxShadow: "0px 0px 10px 4px #f0efef",
                      borderRadius: 10,
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <h6>All</h6>
                      </div>
                      <div className="col-md-6 col-6">
                        <label
                          className="radio-inline"
                          style={{ float: "right" }}
                        >
                          <input type="radio" name="notifalert" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="Alerts-box1  p-3 mb-3"
                    style={{
                      boxShadow: "0px 0px 10px 4px #f0efef",
                      borderRadius: 10,
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <h6>Admin</h6>
                      </div>
                      <div className="col-md-6 col-6">
                        <label
                          className="radio-inline"
                          style={{ float: "right" }}
                        >
                          <input type="radio" name="notifalert" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="Alerts-box1  p-3 mb-3"
                    style={{
                      boxShadow: "0px 0px 10px 4px #f0efef",
                      borderRadius: 10,
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <h6>Only Me</h6>
                      </div>
                      <div className="col-md-6 col-6">
                        <label
                          className="radio-inline"
                          style={{ float: "right" }}
                        >
                          <input
                            className="buttonwrap"
                            type="radio"
                            name="notifalert"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <a href="#">
                    <button
                      type="button"
                      className="btn btn-primary mt-3 p-2"
                      style={{
                        width: "100%",
                        borderRadius: 50,
                        fontWeight: "bold",
                      }}
                    >
                      Save
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotifAlert;
