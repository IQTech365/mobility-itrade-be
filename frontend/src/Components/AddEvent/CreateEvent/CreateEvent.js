import React, { useCallback, useState, useEffect } from "react";
import {
  Grid,
  InputLabel,
  Select,
  FormControl,
  Modal,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDropzone } from "react-dropzone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import EventNameBox from "./EventNameBox";
import AddImg from "../../../Assets/AddImage.svg";
import Uploading from "../../../Assets/Uploading.svg";
import EventDetails from "./EventDetails";
import ImageSelectionModal from "./ImageSelectionModal";
import "./CreateEvent.css";
import { makeStyles } from "@material-ui/core/styles";
export default function CreateEvent(props) {
  const useStyles = makeStyles((theme) => ({
    notchedOutline: {
      borderWidth: "3px",
      borderColor: "#3897f1 !important",
      borderRadius: "150px",
      color: "#3897f1 !important",
    },
  }));
  const classes = useStyles();
  const [disablesave, setDisablesave] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const [erroring, seterroring] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4 ",
  });
  const [showPopup, toggleShowPopup] = useState(false);
  const [url, seturl] = useState(AddImg);
  useEffect(() => {
    if (
      props.Events[props.SelectedEvent] !== undefined &&
      props.Events[props.SelectedEvent].file !== ""
    ) {
      if (props.Events[props.SelectedEvent].file === "uploading") {
        seturl(Uploading);
      } else {
        seturl(props.Events[props.SelectedEvent].file);
      }
    } else {
      seturl(AddImg);
    }
  }, [
    props.Events[props.SelectedEvent] !== undefined
      ? props.Events[props.SelectedEvent].file
      : "",
  ]);

  return (
    <>
      <Grid container spacing={0} className="m-0  p-15px pt-0 pb-0">
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="outlined"
            className="w-100-p  m-b-10 "
            size="small"
            variant="outlined"
          >
            <Select
              native
              value={props.Type}
              onChange={props.handleChange}
              error={erroring}
              className="selectboxblue"
              displayEmpty
            >
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Wedding Anniversary">Wedding Anniversary</option>
              <option value="Get Together">Get Together</option>
              <option value="Formal Event">Formal Event</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="noe">
            <Grid container spacing={0}>
              <Grid item xs={false} sm={1} md={2} />
              <Grid item xs={7} sm={6} md={6} className="tal  mfs-12">
                Number Of Events
              </Grid>
              <Grid item xs={5} sm={5} md={4}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <div className="Cirlce tar  fl">
                      <RemoveCircleOutlineIcon
                        className="l-blue-t "
                        fontSize="large"
                        onClick={() => {
                          props.removeAnEvent();
                        }}
                      />
                    </div>
                    <div className="white box  fl">{props.Events.length}</div>
                    <div className="Cirlce tal  fl">

                      <AddCircleOutlineIcon
                        className="l-blue-t"
                        fontSize="large"
                        onClick={() => {
                          props.addAnEvent();
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div className="event-Names m-b-10 p-15px pb-0 pt-0">
        <EventNameBox
          data={props.Events}
          setEvents={props.setEvents}
          SelectEvent={props.SelectEvent}
          SelectedEvent={props.SelectedEvent}
          checkIfEventEmpty={props.checkIfEventEmpty}
        />
      </div>

      <Grid item xs={12}>
        <EventDetails
          Events={props.Events}
          setEvents={props.setEvents}
          SelectedEvent={props.SelectedEvent}
          SelectEvent={props.SelectEvent}
          checkIfEventEmpty={props.checkIfEventEmpty}
          setDisablesave={setDisablesave}
          disablesave={disablesave}
          albumdata={props.albumdata}
          setStory={props.setStory}
          setalbumdata={props.setalbumdata}
          Story={props.Story}
          template={props.template}
          handleNext={props.handleNext}
          Type={props.Type}
          seterroring={seterroring}
        />
      </Grid>

      <Grid item xs={12}>
        <button
          className={
            disablesave === false ? "save-events disabled" : "save-events "
          }
          onClick={() => {
            if (disablesave === true) {
              props.handleNext();
            }
          }}
        >
          Next
        </button>
      </Grid>
    </>
  );
}
