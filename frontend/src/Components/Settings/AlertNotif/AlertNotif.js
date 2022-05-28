import { Button, Modal } from "react-bootstrap";
import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
class AlertNotif extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
    };
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Alert Notification
        </Button>
        <Modal show={this.state.showHide}>
          <CancelIcon
            onClick={() => this.handleModalShowHide()}
            color="secondary"
            className="popup-close"
            style={{
              float: "left",
              height: 40,
              width: 40,
              marginLeft: 430,
              marginTop: 10,
            }}
          />
          <Modal.Body>
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
                    <label className="radio-inline" style={{ float: "right" }}>
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
                    <label className="radio-inline" style={{ float: "right" }}>
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
                    <label className="radio-inline" style={{ float: "right" }}>
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
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AlertNotif;
