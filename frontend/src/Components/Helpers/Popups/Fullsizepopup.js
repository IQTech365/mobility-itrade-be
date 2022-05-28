import React from "react";
import { Modal } from "@material-ui/core";
import "./Popup.css";
export default function Fullsizepopup(props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="f-s-modal"
        open={props.showPopup}
        onClose={() => {
          props.toggleShowPopup(false);
        }}
      >
        <div className="f-s-modal-card">
          {/* <CancelIcon
            onClick={() => {
              props.toggleShowPopup(false);
            }}
            color="secondary"
            className="popup-close"
          /> */}
          <props.component
            className="modal-component"
            hide={props.toggleShowPopup}
          />
        </div>
      </Modal>
    </div>
  );
}
