import React from "react";
import Header from "../Helpers/Header/Header.js";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Image,
  Form,
  Buttonm,
} from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "../Comments/Comments.css";
import CommentAvt from "../../Assets/CommentAvt.png";
import { FcLike } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";
class Comments extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Container className="comments-box">
          <Row style={{ marginTop: 30, marginRight: 3, marginLeft: 3 }}>
            <IoArrowBackCircleOutline size={40} style={{ color: "black" }} />
            <h3 style={{ color: "black", fontSize: 28, fontWeight: "bold" }}>
              Comments
            </h3>

            {/* Comments Section Starts Here */}
          </Row>
          <Row
            style={{
              marginTop: 40,
              padding: 20,
              marginLeft: "auto",
              boxShadow: "5px 5px 16px -7px rgba(0,0,0,0.54)",
            }}
            md={2}
          >
            <Col md={1}>
              <Image src={CommentAvt} style={{ marginRight: 9 }} />
            </Col>
            <Col>
              <h5>Mario Speedwagon</h5>
            </Col>
            <Col md={{ offset: 1, span: 10 }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Col>
            <Col md={{ offset: 1 }}>
              <FcLike size={20} /> 15 Likes
            </Col>
          </Row>

          <Row
            style={{
              marginTop: 25,
              padding: 20,
              marginLeft: "auto",
              boxShadow: "5px 5px 16px -7px rgba(0,0,0,0.54)",
            }}
            md={2}
          >
            <Col md={1}>
              <Image src={CommentAvt} style={{ marginRight: 9 }} />
            </Col>
            <Col>
              <h5>Mario Speedwagon</h5>
            </Col>
            <Col md={{ offset: 1, span: 10 }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Col>
            <Col md={{ offset: 1 }}>
              <FcLike size={20} /> 15 Likes
            </Col>
          </Row>

          {/* Comments Box Here */}
          <Row
            style={{
              marginTop: 25,
              padding: 20,
              marginLeft: "auto",
              boxShadow: "5px 5px 16px -7px rgba(0,0,0,0.54)",
            }}
          >
            <Col>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Write a Comment"
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
              <IoMdSend size={20} style={{ float: "right" }} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Comments;
