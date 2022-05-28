import React, { useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import Tenmplate from "../../../Assets/TemplateNone.svg";
export default function ImageSelectionModal(props) {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 10259265) {
      alert("Max file size 10 mb");
      return false;
    }

    console.log(props.data);

    let EventsCpy = await { ...props.CurrentEventDetails };
    let type = acceptedFiles[0].type.split("/");
    EventsCpy.filetype = type[1];
    var reader = await new FileReader();
    reader.onload = async function () {
      EventsCpy.file = reader.result;
      await props.SetCurrentEventDetails(EventsCpy);
      props.show(false);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4",
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <h2 className="tac">Upload Your Picture</h2>
      </Grid>
      <Grid item xs={6}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img src={Gallery} className="w-100" />
        </div>
      </Grid>
      <Grid item xs={6}>
        <img src={Tenmplate} className="w-100" />
      </Grid>
    </Grid>
  );
}
