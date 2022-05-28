import React, { useState, useEffect, useCallback } from "react";
import "../Feed/Feed.css";
import Header from "../Helpers/Header/Header.js";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import zoomicon from "../../Assets/zoomicon.png";
import UserData from "../Helpers/UserData/UserData";
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import { IoCameraOutline } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import axios from "axios";
import { addpost, likepost } from "../../Redux/DispatchFuncitons/postfunctions";
import { uploadString } from "../../Utils/FileUpload_Download";
import { useDropzone } from "react-dropzone";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FcLikePlaceholder } from "react-icons/fc";
import history from "../../Utils/History";
import FeedComments from "./FeedComments";
import { url } from "../../Utils/Config";
import { Modal } from "@material-ui/core";
import Media from "./Media";
import NavMobile from "../Helpers/NavMobile/NavMobile";
import Badge from "react-bootstrap/Badge";
import { Multiselect } from "multiselect-react-dropdown";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import AddTags from "./AddTags";
import Popup from "../Helpers/Popups/Popup";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Postrender from './Posts'
import AddPost from "./AddPost";
export default function Feed(props) {
  const Auth = useSelector((state) => state.Auth);
  let Posts = useSelector((state) => state.Posts[props.match.params.id]);
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);
  const dispatch = useDispatch();
  const [isSubmit, setisSubmit] = useState(false);
  const [isloaded, toggleisloaded] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false);
  const [ShowTagQuery, setShowTagQuery] = useState(false);
  const [showcommment, setshowcommment] = useState(false);
  const [currentPosts, setcurrentPosts] = useState([]);
  const [currentfilteredPosts, setcurrentfilteredPosts] = useState([]);
  const [participant, setparticipant] = useState([]);
  const [Eventdata, setEventdata] = useState([]);
  const [admins, setadmins] = useState([]);
  const [Tags, setTags] = useState([]);

  const [base, setbase] = useState("");
  const [filter, setfilter] = useState("All");
  const [caption, setcaption] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [type, settype] = useState("");
  const [popuptype, setpopuptype] = useState("");
  const [showcommmentforpost, setshowcommmentforpost] = useState(null);

  useEffect(async () => {
    debugger
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      await setfilter('All')
      if (
        props.location.pathname ===
        "/MyEvents/eventpage/feed/" + props.match.params.id &&
        MyEvents.length > 0
      ) {
        await setEventdata(MyEvents[props.match.params.id]);
        await setbase("MyEvents");
        await setadmins(MyEvents[props.match.params.id][0].Host);
        await guestlist([...MyEvents[props.match.params.id][0].Participants, ...MyEvents[props.match.params.id][0].Host]);
      } else if (
        props.location.pathname ===
        "/inv/eventpage/feed/" + props.match.params.id &&
        myInvitations.length > 0
      ) {
        await setEventdata(myInvitations[props.match.params.id]);
        await setbase("inv");
        await setadmins(myInvitations[props.match.params.id][0].Host);
        await guestlist([...myInvitations[props.match.params.id][0].Participants, ...myInvitations[props.match.params.id][0].Host]);
      }
      await getposts()
    }
  }, [MyEvents, myInvitations]);

  const submit = async () => {
    await setisSubmit(true);
    var d = new Date();
    let unique = d.getTime();
    let url = Eventdata[0].MainCode + unique + "." + type;
    console.log(url);
    let newurl = "";
    if (imageurl !== "") {
      newurl = await uploadString(imageurl, url);
    }
    await dispatch(
      addpost(Eventdata[0].MainCode, Auth.Phone, newurl, type, Tags, caption)
    );
    await setcaption("");
    await setimageurl("");
    await settype("");
    await setTags([]);
    await setisSubmit(false);
    await getposts();
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 5259265) {
      alert("Max file size 5mb");
      return false;
    }
    let url = "";
    let ftype = acceptedFiles[0].type.split("/");
    settype(ftype[0]);
    var reader = await new FileReader();
    reader.onload = async function () {
      url = reader.result;
      setimageurl(url);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4 ",
  });

  const getposts = async () => {
    if (Eventdata !== undefined && Eventdata.length > 0 && Eventdata[0].MainCode !== "") {
      axios
        .post(url + "post/getposts", { maincode: Eventdata[0].MainCode })
        .then(async function (response) {
          toggleisloaded(true);
          if (response.data.Posts.length !== 0) {
            await setcurrentPosts(response.data.Posts);
            await filterposts(response.data.Posts, Eventdata[0].Host)
          }

        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  };
  const filterposts = async (Posts, admins) => {
    let Postscpy = [];
    for (let i = 0; i < Posts.length; i++) {
      if (admins.includes(Posts[i].by) === true) {
        Postscpy.push(Posts[i]);
      }
    }
    await setcurrentfilteredPosts(Postscpy)
  };



  const guestlist = async (Participants) => {
    debugger
    var ParticipantsCPY = [];

    for (let i = 0; i < Participants.length; i++) {
      var Phone = "";
      if (Participants[i] !== Auth.Phone) {
        if (typeof Participants[i] === "string") {
          Phone = Participants[i].includes("+")
            ? Participants[i]
            : "+91" + Participants[i];
        } else {
          Phone = Participants[i].toString().includes("+")
            ? Participants[i]
            : "+91" + Participants[i];
        }

        // await axios
        //   .post(url + "auth/getuserdetails", {
        //     Phone: Phone,
        //   })
        //   .then(async (res) => {
        //     if (res.data.user) {
        //       await ParticipantsCPY.push({
        //         name: res.data.user.Name,
        //         id: Participants[i],
        //       });
        //     } else {
        //       await ParticipantsCPY.push({
        //         name: Participants[i],
        //         id: Participants[i],
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     return { err: "error 404" };
        //   });
      }
    }
    console.log(Participants);
    await setparticipant(Participants);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getposts();
    }, 30000);
    return () => clearInterval(interval);
  }, [Eventdata]);

  useEffect(() => {
    console.log(admins)
    console.log(admins.includes('+917447525123'))
  }, [filter])

  return (
    <>
      <NavMobile base={base} id={props.match.params.id} />
      <Popup
        component={AddTags}
        toggleShowPopup={setShowTagQuery}
        showPopup={ShowTagQuery}
        MainCode={[...participant]}
        showall={setTags}
        url={Tags}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="f-s-modal"
        open={showPopup}
        onClose={() => {
          toggleShowPopup(false);
        }}
      >
        <Container fluid className="p-0 m-0">
          <div className="f-s-modal-card ">
            <Media
              toggleShowPopup={toggleShowPopup}
              currentPosts={currentPosts}
              popuptype={popuptype}
            />
          </div>
        </Container>
      </Modal>
      <Container className="guestlist-box" fluid>
        <div className="back-navigation desktop-only">
          <Row style={{ marginTop: 5, marginRight: 3, marginLeft: 3 }}>
            <IoArrowBackCircleOutline
              size={40}
              style={{ color: "black" }}
              onClick={() => history.goBack()}
            />
            <h3 style={{ color: "black", fontSize: 28, fontWeight: "900" }}>
              Feed
            </h3>
          </Row>
        </div>
        {Eventdata && Eventdata.length > 0 ? (
          <>
            {Eventdata[0].filetype === "png" ||
              Eventdata[0].filetype === "jpg" ||
              Eventdata[0].filetype === "jpeg" ? (
              <Image src={Eventdata[0].file} fluid style={{ height: "30vh" }} />
            ) : (
              <video
                muted
                type="video/mp4"
                autoPlay={true}
                src={Eventdata[0].file}
                preload="none"
                className="w-100"
                style={{ height: "30vh" }}
              />
            )}
          </>
        ) : (
          <></>
        )}

        <Image src={zoomicon} className="profile-avatar" />
        <h3 className="event-headings">
          {Eventdata[0] ? Eventdata[0].Name : ""}
        </h3>

        <div className="select-list">
          <Row className="p-0 m-0">
            <Col>
              <Button
                variant="outline-primary"
                style={{ width: "30vw", borderRadius: 20 }}
                onClick={async () => {
                  await setpopuptype("Photo");
                  toggleShowPopup(true);
                }}
              >
                Photos
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={async () => {
                  await setpopuptype("Videos");
                  toggleShowPopup(true);
                }}
                style={{ width: "30vw", borderRadius: 20, marginLeft: 20 }}
              >
                Videos
              </Button>
            </Col>
          </Row>
        </div>
        <div className="select-list mt-10px">
          <Row className="filterbox">
            <Col
              onClick={async () => {
                await setfilter("All");
                // await filterposts(currentPosts);
              }}
              className={filter === "All" ? "filter-type" : ""}
            >
              <span style={{ width: "30vw", borderRadius: 20 }}>All</span>
            </Col>
            <Col
              onClick={async () => {
                await setfilter("Update");

                // await filterposts(currentPosts);
              }}
              className={filter === "Update" ? "filter-type" : ""}
            >
              <span style={{ width: "30vw", borderRadius: 20 }}> Update</span>
            </Col>
          </Row>
        </div>
      </Container>
      <AddPost settype={settype} setimageurl={setimageurl} setcaption={setcaption}
        caption={caption} submit={submit} setShowTagQuery={setShowTagQuery} imageurl={imageurl} isSubmit={isSubmit} />

      {isloaded === false ? (
        <center>
          <CircularProgress style={{ color: "black" }} />
        </center>
      ) : (
        <Postrender data={currentPosts} filter={filter} filterdata={currentfilteredPosts} getposts={getposts}
          Eventdata={Eventdata} showcommmentforpost={showcommmentforpost} showcommment={showcommment}
          setshowcommmentforpost={setshowcommmentforpost}
          setshowcommment={setshowcommment} />
      )}


    </>
  );
}

