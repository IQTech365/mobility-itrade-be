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

export default function AddPost(props) {
    const Auth = useSelector((state) => state.Auth);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles[0].size > 5259265) {
            alert("Max file size 5mb");
            return false;
        }
        let url = "";
        let ftype = acceptedFiles[0].type.split("/");
        console.log(ftype)
        props.settype(ftype[0]);
        var reader = await new FileReader();
        reader.onload = async function () {
            url = reader.result;
            props.setimageurl(url);
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

    return (
        <Container
            className="addpost-event  "
            style={{ marginTop: 10, marginBottom: 10 }}
            fluid
        >
            <Row className="commentinp">
                <Col xs={2} md={1}>
                    <UserData Phone={Auth.Phone} showIcon={true} />
                </Col>
                <Col xs={8} md={10}>
                    <input
                        type="text"
                        onChange={(e) => {
                            props.setcaption(e.target.value);
                        }}
                        value={props.caption}
                        variant="outlined"
                        size="small"
                        className="w-100"
                        placeholder="Add comment"
                        style={{
                            width: "100%",
                            outline: "none",
                            border: "none",
                            background: "#f6f6f6",
                            height: "100%",
                            fontSize: 14,
                        }}
                    />
                </Col>
                <Col xs={2} md={1}>
                    {props.isSubmit === false ? (
                        <IconButton
                            onClick={() => {
                                props.submit();
                            }}
                        >
                            <SendIcon style={{ color: "black" }} />
                        </IconButton>
                    ) : (
                        <IconButton>
                            <CircularProgress style={{ color: "black" }} />
                        </IconButton>
                    )}
                </Col>
            </Row>

            <Row className="addmedia-tag" style={{ marginTop: 20 }}>
                <Col className="btn t-blue ll-blue btn-rnd m-5px" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <a style={{ color: "#007bff" }}>
                        <IoCameraOutline size={20} /> Add Media
                    </a>
                </Col>
                <Col className="btn t-blue ll-blue btn-rnd m-5px">
                    <a
                        style={{ color: "#007bff" }}
                        onClick={() => {
                            props.setShowTagQuery(true);
                        }}
                    >
                        <FaTag size={17} /> Tag
                    </a>
                    {/* )} */}
                </Col>
            </Row>
            {props.imageurl !== "" ? (
                props.type !== "mp4" ? (
                    <Row>
                        <Col md={12}>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img
                                    src={props.imageurl}
                                    className="w-100"
                                    style={{ height: "30vh" }}
                                />
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <center>
                            <video
                                src={props.imageurl}
                                type="video/mp4"
                                controls={true}
                                preload="none"
                                height={260}
                                width={window.innerWidth > 400 ? 800 : window.innerWidth}
                                autoPlay="true"
                            />
                        </center>
                    </Row>
                )

            ) : (
                <></>
            )}
        </Container>
    )
}
