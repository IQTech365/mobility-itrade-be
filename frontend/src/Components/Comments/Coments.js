import React, { useState, useEffect } from "react";
import Header from "../Helpers/Header/Header.js";
import { Container, Row, Col, Form } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "../Comments/Comments.css";
import CommentAvt from "../../Assets/CommentAvt.png";
import { FcLike } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { url } from "../../Utils/Config";
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import { FcLikePlaceholder } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
import history from "../../Utils/History";
import { likecomment } from '../../Redux/DispatchFuncitons/postfunctions'
import { comment_event } from '../../Redux/DispatchFuncitons/Eventfunctions'
import {
  GetEvents,
  GetInvitations
} from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function Coments(props) {
  const dispatch = useDispatch()
  const Auth = useSelector((state) => state.Auth);
  let Events = useSelector((state) => state.Eventdata);
  const [MainCode, setMainCode] = useState("");
  const [eveid, seteveid] = useState("");
  const [comments, setcomments] = useState([]);
  const [comment, setcomment] = useState("");
  let base = "";
  let Eventdata = [];
  const getcomments = () => {
    axios
      .post(url + "post/getEventcomments", {
        id: props.match.params._id,
        Phone: Auth.Phone,
      })
      .then(async (res) => {
        if (res.data.data) {
          console.log(res.data.data);
          await setcomments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        return { err: "error 404" };
      });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getcomments();
    }, 30000);
    return () => clearInterval(interval);
  }, [])

  const submit = async () => {
    if (comment !== "") {
      var saved = await dispatch(comment_event(props.match.params._id, comment))
      if (saved === 1) {
        await setcomment("");
        await getcomments();
      }

    }
  };
  useEffect(async () => {

    // console.log("/MyEvents/eventpage/chat/" + props.match.params.id);
    if (Events.myEvents.length > 0 && Events.myInvitations > 0) {
      if (
        props.location.pathname ===
        "/MyEvents/comments/" + props.match.params.id
      ) {
        Eventdata = Events.myEvents[props.match.params.id];
        base = "MyEvents";
        await seteveid(Eventdata[0]._id)
        await setMainCode(Eventdata[0].MainCode)
      } else {
        Eventdata = Events.myInvitations[props.match.params.id];
        base = "inv";
        await seteveid(Eventdata[0]._id)
        await setMainCode(Eventdata[0].MainCode)
      }
    } else {
      await dispatch(GetEvents())
      await dispatch(GetInvitations())
    }


    // Eventdata.map((singleevent) => {
    //   setcomments(singleevent.CommentList);
    // });
  }, [Eventdata]);

  useEffect(() => {
    if (props.showcommment === true) {
      console.log(props.id);
      axios
        .post(url + "post/getpostcomments", {
          id: props.id,
          Phone: Auth.Phone,
        })
        .then((res) => {
          if (res.data.data) {
            console.log(res.data.data);
            setcomments(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
          return { err: "error 404" };
        });
    }
  }, [props.showcommment]);

  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <Container className="p-0 ofh h80" fluid>
        <Container>
          <Row
            style={{
              marginTop: 20,
              marginRight: 3,
              marginLeft: 3,
              marginBottom: 5,
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: 23 }}>
              <IoArrowBackCircleOutline
                size={40}
                onClick={() => {
                  history.goBack();
                }}
              />
              Event
            </p>
            <Col></Col>
          </Row>
        </Container>
        {comments.map((comment) => (
          <Row
            style={{
              marginLeft: "auto",
              paddingLeft: 5,
              marginRight: 5,
            }}
            md={2}
          >
            <Col xs={2} md={1}>
              <UserDataUrl showIcon={true} Phone={comment.CommentBy} />
            </Col>
            <Col xs={8} md={9}>
              <h5 className="m-0 p-0">
                <UserDataUrl showName={true} Phone={comment.CommentBy} />
              </h5>
              <p className=" m-5px fs-14">{comment.Comment}</p>
            </Col>
            <Col xs={2} md={1}>
              <Like likeby={comment.likeby} MainCode={MainCode} _id={comment._id} />
              {comment.likeby ? comment.likeby.Length : 0}
            </Col>
          </Row>
        ))}
      </Container>
      <Container fluid className="p-0">
        <Row
          style={{
            marginTop: 25,

            marginLeft: "auto",
            boxShadow: "4px 7px 7px -7px rgba(0,0,0,0.54)",
          }}
        >
          <Col xs={10}>
            <Form.Control
              placeholder="Write a Comment"
              style={{
                width: "100%",
                margin: 0,
                marginTop: "5px",
                marginBottom: "5px",
              }}
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
            />
          </Col>
          <Col
            xs={2}
            onClick={() => {
              submit();
            }}
          >
            <IoMdSend
              size={20}
              style={{ float: "right", margin: "auto", marginTop: "5px" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export function Like(props) {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [isliked, setisliked] = useState(false);
  useEffect(() => {
    setisliked(props.likeby ? props.likeby.includes(Auth.Phone) : false);
  }, []);
  async function Dislike() {
    let likelistcpy = [...props.likeby];
    likelistcpy[props.index] = false;
    await setisliked(false)
  }
  async function Like() {
    let likelistcpy = [...props.likeby];
    likelistcpy[props.index] = true;
    // props.setLikeList(likelistcpy);
    await setisliked(true)
  }
  const likethecomment = () => { };
  return (
    <>
      {isliked === false ? (
        <FcLikePlaceholder
          size={30}
          onClick={() => {
            dispatch(likecomment(props._id, Auth.Phone, props.MainCode));
            Like();
            likethecomment();
          }}
        />
      ) : (
        <FcLike
          size={30}
          onClick={() => {
            dispatch(likecomment(props._id, Auth.Phone, props.MainCode));
            Dislike();
            likethecomment();
          }}
        />
      )}
      Like {props.likeby.Length}
    </>
  );
}
