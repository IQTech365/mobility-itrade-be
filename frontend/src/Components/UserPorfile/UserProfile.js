import React, { useState, useCallback } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import male from "../../Assets/Male.svg";
import female from "../../Assets/Female.svg";
import { useDropzone } from "react-dropzone";
import { uploadString } from "../../Utils/FileUpload_Download";
import { useSelector, useDispatch } from "react-redux";
import { saveuserinfo } from "../../Redux/DispatchFuncitons/AuthFunctions";
import "./userProfile.css";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
export default function UserProfile(props) {
  const [showerror, setshowerror] = useState(false);
  const [Name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [Gender, setGender] = useState("");
  const [Image, setImage] = useState("");
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 5259265) {
      alert("Max file size 5mb");
      return false;
    }
    let type = acceptedFiles[0].type.split("/");
    type = type[1];
    var reader = await new FileReader();
    reader.onload = async function () {
      let url = await uploadString(
        reader.result,
        "Profile/" + Auth.Phone + "." + type
      );
      await setImage(url);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg",
  });
  const save = () => {
    if (Name === "" || DOB === "" || Gender === "") {
      setshowerror(true);
    } else {
      dispatch(saveuserinfo(Name, Gender, DOB, Image, props.url));
      setshowerror(false);
      props.hide(false);
    }
  };

  return (
    <Grid container spacing={0} style={{ padding: '15px' }}>
      <Grid item xs={12} {...getRootProps()}>
        <input {...getInputProps()} /><center>
          {Image == "" ? <img src={male} className="Profile" /> : <img src={Image} className="Profile" />}
        </center>

      </Grid>

      <Grid item xs={6}>

        <center
          onClick={() => {
            setGender("M");
          }}
        >
          <img
            src={Gender === "M" && Image !== "" ? Image : male}
            className={
              Image === ""
                ? showerror === true
                  ? "no-proifle "
                  : " Profile"
                : "Profile"
            }
          />
        </center>
      </Grid>

      <Grid item xs={6} >
        <center
          onClick={() => {
            setGender("F");
          }}
        >
          <img
            src={Gender === "F" && Image !== "" ? Image : female}
            className={
              Image === ""
                ? showerror === true
                  ? "no-proifle "
                  : " Profile"
                : "Profile"
            }
          />
        </center>
      </Grid>
      <Grid item xs={12}>
        <span>Name</span>
        <br />
        <TextField
          variant="outlined"
          className="w-100 m-b-5px "
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          error={showerror === true && Name === "" ? true : false}
        />
      </Grid>
      <Grid item xs={12}>
        <span>DOB</span>
        <TextField
          variant="outlined"
          className="w-100 m-b-5px "
          type="date"
          defaultValue="2017-05-24"
          value={DOB}
          onChange={(e) => {
            setDOB(e.target.value);
          }}
          error={showerror === true && DOB === "" ? true : false}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: '#3897F1', borderRadius: 25, marginTop: 10 }}
          className="w-100 m-b-5px"
          onClick={() => {
            save();
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
