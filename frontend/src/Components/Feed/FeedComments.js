import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import { addcomments } from "../../Redux/DispatchFuncitons/postfunctions";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from '@material-ui/icons/Send';

import { IconButton } from '@material-ui/core';
export default function FeedComments(props) {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const [isError, setisError] = useState(false);
  const submit = async () => {
    if (comment !== "") {
      await dispatch(addcomments(props.id, Auth.Phone, comment, props.maincode));

      let commentscpy = [...comments]
      await commentscpy.push({ CommentBy: Auth.Phone, Comment: comment })
      console.log(commentscpy)
      await setcomments(commentscpy)
      await setisError(false);
      await setcomment("")
      await props.getposts(props.maincode)
    } else {
      setisError(true);
    }
  };
  useEffect(() => {
    console.log(props.data)
    setcomments(props.data)
  }, [props.post])

  return (
    <Container fluid className="mt-5px p-0">
      <Row className="commentinp">
        <Col xs={2} md={1} className="m-0 p-0">
          <UserDataUrl showIcon={true} Phone={Auth.Phone} />
        </Col>
        <Col xs={8} className="p-0 ">
          <input
            type='text'
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            variant="outlined"
            size="small"
            className="w-100"
            placeholder="Add comment"
            error={isError}
            style={{ width: '100%', outline: 'none', border: 'none', background: '#f6f6f6', height: '100%', fontSize: 14 }}
          />
        </Col>
        <Col xs={2} className="">
          <IconButton onClick={() => {
            submit();
          }}>
            <SendIcon style={{ color: 'black' }} />
          </IconButton >
        </Col>
      </Row>
      <Row className="p-5px m-5px">
        {comments &&
          comments.map((cmt) => (
            <Row
              style={{
                margin: 0,
                marginTop: '10px !important',
                width: '100%'
              }}
              md={2}
            >
              <Col xs={2} md={1} className="fs-14">
                <UserDataUrl showIcon={true} Phone={cmt.CommentBy} />
              </Col>
              <Col xs={10} md={9}>
                <h5 className="m-0 p-0 fs-14">
                  <UserDataUrl showName={true} Phone={cmt.CommentBy} />
                </h5>

                <span className="t-grey fs-14">{cmt.Comment}</span>
              </Col>


            </Row>
          ))}
      </Row>
    </Container>
  );
}
