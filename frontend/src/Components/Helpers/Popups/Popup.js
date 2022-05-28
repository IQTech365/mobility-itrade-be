import React from "react";
import "./Popup.css";
import { Modal } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
export default function Popup(props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={props.showPopup}
      // onClose={() => {
      //   props.toggleShowPopup(false);
      // }}
      >
        <div className="modal-card">
          <IconButton
            className="popup-close"
            onClick={() => {
              props.toggleShowPopup(false);
            }}
          >
            <CancelIcon color="secondary" fontSize="large" />
          </IconButton>

          <props.component
            className="modal-component"
            hide={props.toggleShowPopup}
            url={props.url ? props.url : ""}
            MainCode={props.MainCode}
            showall={props.showall}
            showinvitaions={props.showinvitaions}
            showevent={props.showevent}
            eventCode={props.eventCode}
            Groups={props.Groups}
          />
        </div>
      </Modal>
    </div>
  );
}
