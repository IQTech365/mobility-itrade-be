import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import { Grid, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { SAVESTORY, DELETESTORY } from "../../../Redux/Actions/EventActions";
import CreateIcon from "@material-ui/icons/Create";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
export default function Story(props) {
  const dispatch = useDispatch();

  const Eventdata = useSelector((state) => state.Eventdata);
  const [subStory, setsubStory] = useState(Eventdata.STORY);
  const [subname, setsubname] = useState("");
  const [file, setfile] = useState("");
  const [filetype, setfiletype] = useState("");
  const [datetime, setdatetime] = useState("");
  const [description, setdescription] = useState("");
  const [currentedited, setcurrentedited] = useState(null);
  const [add, setadd] = useState(true);
  const [edit, setedit] = useState(false);
  const [isError, setError] = useState(false);
  const save = async () => {
    if (
      subname !== "" &&
      datetime !== "" &&
      description !== "" &&
      file !== ""
    ) {
      setError(false);
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        file: file,
        filetype: filetype,
      };
      console.log([...subStory, data]);
      await setsubStory([...subStory, data]);

      dispatch({
        type: SAVESTORY,
        payload: [...subStory, data],
      });
      Delete();
    } else {
      setError(true);
    }
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    let dataurl = "";

    if (acceptedFiles[0].size > 5259265) {
    } else {
      let type = acceptedFiles[0].type.split("/");
      await getBase64(acceptedFiles[0]).then(async (data) => {
        setfile(data);
        setfiletype(type[1]);
      });
    }
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
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg",
  });

  const Delete = () => {
    setsubname("");
    setfile("");
    setfiletype("");
    setdatetime("");
    setdescription("");
    setadd(false);
  };
  const Deletesingle = (i) => {
    let subStorycpy = [...subStory];

    subStorycpy = subStorycpy.filter((eventdata, index) => {
      return index !== i;
    });
    dispatch({
      type: SAVESTORY,
      payload: subStorycpy,
    });
    setsubStory(subStorycpy);
    setedit(false);
    setcurrentedited(null);
  };
  const settoedit = (i) => {
    let data = { ...subStory[i] };
    setsubname(data.Name);
    setfile(data.file);
    setfiletype(data.filetype);
    setdatetime(data.datetime);
    setdescription(data.description);
  };
  const saveedit = async () => {
    let subStorycpy = [...subStory];
    if (
      subname !== "" &&
      datetime !== "" &&
      description !== "" &&
      file !== ""
    ) {
      setError(false);
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        file: file,
        filetype: filetype,
      };
      subStorycpy[currentedited] = data;
      await setsubStory([...subStorycpy]);
      dispatch({
        type: SAVESTORY,
        payload: subStory,
      });
      Delete();
      setedit(false);
    } else {
      setError(true);
    }
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        {subStory.map((eve, index) => (
          <Grid
            key={eve.Name + index}
            container
            spacing={0}
            className="card-shadow  m-b-10  "
          >
            <Grid item xs={4} md={3}>
              {edit === true && currentedited === index ? (
                <div {...getRootProps()} className="w-100">
                  <input {...getInputProps()} className="w-100" />
                  {eve.filetype === "png" ||
                    eve.filetype === "jpg" ||
                    eve.filetype === "jpeg" ? (
                    <img
                      src={eve.file === undefined ? " " : eve.file}
                      className="w-100 story-image"
                    />
                  ) : (
                    <video
                      src={eve.file === undefined ? " " : eve.file}
                      className="w-100 story-image"
                    />
                  )}
                  {isError === true && file === "" ? (
                    <span className="error">please add valid image</span>
                  ) : (
                    <></>
                  )}
                </div>
              ) : eve.filetype === "png" ||
                eve.filetype === "jpg" ||
                eve.filetype === "jpeg" ? (
                <img
                  src={eve.file === undefined ? " " : eve.file}
                  className="w-100  story-image"
                />
              ) : (
                <video
                  src={eve.file === undefined ? " " : eve.file}
                  className="w-100  story-image"
                />
              )}
            </Grid>
            <Grid item xs={8} md={7}>
              <Grid container spacing={0} className="m-5px">
                <Grid item xs={12}>
                  {edit === true && currentedited === index ? (
                    <TextField
                      className="w-100"
                      label="Event Name"
                      onChange={(e) => {
                        setsubname(e.target.value);
                      }}
                      value={subname}
                      error={isError === true && subname === "" ? true : false}
                    />
                  ) : (
                    <h2 className="m-0">{eve.Name}</h2>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {edit === true && currentedited === index ? (
                    <TextField
                      className="w-100 m-b-5px "
                      label="Event description"
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                      value={description}
                      error={
                        isError === true && description === "" ? true : false
                      }
                    />
                  ) : (
                    <p> {eve.description}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {edit === true && currentedited === index ? (
                    <form noValidate>
                      <TextField
                        id="datetime-local"
                        label="Schedule timing"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="w-100 "
                        onChange={(e) => {
                          setdatetime(e.target.value);
                        }}
                        value={datetime}
                        error={
                          isError === true && datetime === "" ? true : false
                        }
                      />
                    </form>
                  ) : (
                    eve.datetime
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
              <center>
                {edit === true && currentedited === index ? (
                  <IconButton
                    onClick={() => {
                      saveedit();
                    }}
                  >
                    <CheckCircleOutlineIcon color="success" />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      onClick={async () => {
                        setedit(true);
                        setadd(false);
                        Delete();
                        await setcurrentedited(index);
                        await settoedit(index);
                      }}
                    >
                      <CreateIcon
                        color="inherit"
                        fontSize={"large"}
                        style={{ color: "green" }}
                      />
                    </IconButton>
                  </>
                )}
                <IconButton
                  onClick={() => {
                    Deletesingle(index);
                  }}
                >
                  <DeleteForeverIcon color="error" fontSize={"large"} />
                </IconButton>
              </center>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        className={add === false ? "hide" : "show card-shadow m-b-10 "}
      >
        <Grid container spacing={2}>
          <Grid item xs={4} md={2}>
            {file === "" ? (
              <div {...getRootProps()} className="w-100">
                <input {...getInputProps()} className="w-100" />
                <img
                  src={Gallery}
                  className="w-100 uploadhere"
                  className="w-100"
                />
              </div>
            ) : filetype === "png" ||
              filetype === "jpg" ||
              filetype === "jpeg" ? (
              <img src={file} className="w-100 story-image" />
            ) : (
              <div {...getRootProps()} className="w-100">
                <input {...getInputProps()} className="w-100" />
                <video src={file} className="w-100  story-image" />
              </div>
            )}
            {isError === true && file === "" ? (
              <span className="error">please add valid image</span>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={8} md={8} className="">
            <TextField
              className="w-100"
              label="Event Name"
              onChange={(e) => {
                setsubname(e.target.value);
              }}
              value={subname}
              error={isError === true && subname === "" ? true : false}
            />

            <TextField
              className="w-100 m-b-5px "
              label="Event description"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              value={description}
              error={isError === true && description === "" ? true : false}
              inputProps={{ maxLength: 120 }}
            />

            <form noValidate>
              <TextField
                id="datetime-local"
                label="Schedule timing"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
                className="w-100 "
                onChange={(e) => {
                  setdatetime(e.target.value);
                }}
                error={isError === true && datetime === "" ? true : false}
                value={datetime}
              />
            </form>
          </Grid>
          <Grid item xs={12} md={2}>
            <center>
              <IconButton
                onClick={() => {
                  save();
                }}
              >
                <CheckCircleOutlineIcon
                  color="inherit"
                  fontSize={"large"}
                  style={{ color: "green" }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  Delete();
                }}
              >
                <DeleteForeverIcon color="error" fontSize={"large"} />
              </IconButton>
            </center>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <button
          class="btn save-event m-5px"
          onClick={() => {
            props.SetName("Album");
          }}
        >
          Next
        </button>
      </Grid>
      <Grid item xs={12} md={12}>
        <center>
          <AddCircleRoundedIcon
            fontSize="large"
            className="add-button bottom"
            onClick={() => {
              Delete();
              setcurrentedited("");
              setedit(false);
              setadd(true);
            }}
          />
        </center>
      </Grid>
    </Grid>
  );
}
