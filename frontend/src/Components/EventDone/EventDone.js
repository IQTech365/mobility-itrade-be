import { Button, Modal } from "react-bootstrap";
import React from "react";
import checkimage from "../../Assets/check-circle.1.png";
import CancelIcon from "@material-ui/icons/Cancel";
class EventDone extends React.Component {
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
          Event Done
        </Button>
        <Modal show={this.state.showHide}>
          <CancelIcon
            style={{
              float: "left",
              height: 40,
              width: 40,
              marginLeft: 430,
              marginTop: 10,
            }}
            onClick={() => this.handleModalShowHide()}
            color="secondary"
            className="popup-close"
          />
          <Modal.Body>
            <div className="text-center">
              <img
                src={checkimage}
                className="rounded"
                alt="..."
                style={{ height: 160, width: 160 }}
              />
            </div>
            <br />
            <h3 style={{ textAlign: "center" }}>
              Your Invitation has been
              <br />
              successfully added.
            </h3>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EventDone;
