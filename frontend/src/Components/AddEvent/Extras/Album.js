import React, { useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import "./Extras.css";
import { useDispatch, useSelector } from "react-redux";
import { SAVEALBUM, DELETEALBUM } from "../../../Redux/Actions/EventActions";
export default function Album(props) {
  const dispatch = useDispatch();
  const Eventdata = useSelector((state) => state.Eventdata);
  let bkpalbum = [];
  let filetype = [];
  const [album, setAlbum] = useState([...Eventdata.ALBUM]);

  const save = async () => {
    dispatch({
      type: SAVEALBUM,
      payload: album,
    });
    props.open(false);
  };

  const cancel = () => {
    setAlbum([]);
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    bkpalbum = [];
    filetype = [];

    for (let i = 0; i < acceptedFiles.length; i++) {
      if (acceptedFiles[i].size > 5259265) {
      } else {
        let type = acceptedFiles[i].type.split("/");
        type = type[1];
        await getBase64(acceptedFiles[i]).then(async (data) => {
          await bkpalbum.push({ data: data, type: type });
          await filetype.push(type);
        });
      }
    }
    await setAlbum(bkpalbum);
    return true;
  }, []);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
  });

  const deleteimage = (i) => {
    let albumcpy = [...album];
    albumcpy = albumcpy.filter((item, index) => i !== index);
    setAlbum([...albumcpy]);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img src={Gallery} className="w-100 uploadhere" />
        </div>
      </Grid>
      <Grid item xs={12} className="ofh view">
        <Grid container spacing={4}>
          {album.length > 0
            ? album.map((image, index) => (
              <Grid item xs={4} md={2} key={"img" + index}>
                <CancelIcon
                  onClick={() => {
                    deleteimage(index);
                  }}
                  color="secondary"
                  className="delete-img"
                />
                <img src={image.data} className="w-100 preview" />
              </Grid>
            ))
            : Array.from({ length: 30 }, (value, key) => (
              <Grid
                item
                xs={2}
                md={1}
                key={"img" + key}
                className="w-100 preview grey m-5px"
              ></Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} className="submit jcc">
        <button
          onClick={() => {
            save();
          }}
          className="add-album  "
        >
          Save
        </button>
      </Grid>
    </Grid>
  );
}
