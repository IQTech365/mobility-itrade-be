
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

export default function Postrender(props) {
    const [Posts, setPosts] = useState([])
    useEffect(() => {
        if (props.filter === 'All') {
            setPosts(props.data)
        } else {
            setPosts(props.filterdata)
        }

    }, [props.data, props.filter, props.filterdata])
    return (
        <div>
            <>
                {Posts.map((post, index) => (
                    <Container
                        className="main-feed "
                        style={{
                            marginTop: 10,
                            padding: 20,

                        }}
                    >
                        <Row className="m-0">
                            <Col xs={2} md={1} fluid>
                                <UserData showIcon={true} Phone={post.by} className="fl" />
                            </Col>
                            <Col className="m-0 p-0">
                                <p className=" m-5px fs-14">
                                    <b>
                                        <UserDataUrl Phone={post.by} showName={true} />
                                    </b>
                                    {post.tags.length > 0 ? (
                                        <>
                                            {" "}
                                            is with:{" "}
                                            <b>
                                                <UserDataUrl Phone={post.tags[0]} showName={true} />
                                            </b>
                                            {post.tags.length >= 2 ? (
                                                <> and {post.tags.length - 1} other(s)</>
                                            ) : (
                                                <></>
                                            )}
                                            :
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </p>
                            </Col>
                            <Col xs={12}>
                                <p className=" m-5px fs-14">{post.caption}</p>
                            </Col>
                        </Row>

                        {post.fileurl !== "" ? (
                            post.filetype === "image" ? (
                                <Image src={post.fileurl} fluid />
                            ) : (
                                <center>
                                    {" "}
                                    <video
                                        height="360"
                                        width={window.innerWidth > 500 ? 800 : window.innerWidth}
                                        autoplay={false}
                                        src={post.fileurl}
                                        type="video/mp4"
                                        controls={true}
                                        preload="none"
                                    />
                                </center>
                            )
                        ) : (
                            <></>
                        )}
                        <Row className="m-0 p-0">
                            <Col xs={6} className="mt-10px">
                                <center>
                                    <a
                                        style={{ color: "rgb(244 67 54)" }}
                                        onClick={() => {
                                            props.getposts();
                                        }}
                                    >
                                        <Like
                                            index={index}
                                            LikeList={post.LikeList}
                                            _id={post._id}
                                            getposts={props.getposts}
                                            maincode={props.Eventdata[0].MainCode}
                                        />
                                    </a>
                                </center>
                            </Col>
                            <Col xs={6} className="mt-10px">
                                <center>
                                    <a
                                        style={{ color: "#007bff" }}
                                        onClick={async () => {
                                            console.log(props.showcommmentforpost)
                                            console.log(!props.showcommment)
                                            console.log(!props.showcommment)
                                            if (props.showcommmentforpost === post._id) {
                                                props.setshowcommment(!props.showcommment);
                                                props.setshowcommmentforpost(post._id);
                                                await props.getposts();
                                            } else {
                                                props.setshowcommment(true);
                                                props.setshowcommmentforpost(post._id);
                                                await props.getposts();
                                            }
                                        }}
                                    >
                                        <FaRegCommentDots size={25} style={{ marginLeft: 30 }} />

                                        {post.CommentList.length}
                                    </a>
                                </center>
                            </Col>
                        </Row>

                        <Col>
                            {props.showcommment === true && props.showcommmentforpost === post._id ? (
                                <FeedComments
                                    id={post._id}
                                    getposts={props.getposts}
                                    data={post.CommentList}
                                    maincode={props.Eventdata[0].MainCode}
                                    post={post}
                                />
                            ) : (
                                <></>
                            )}
                        </Col>
                    </Container>
                ))}
            </>
        </div>
    )
}
export function Like(props) {
    const dispatch = useDispatch();
    const Auth = useSelector((state) => state.Auth);
    const [isLike, setisLike] = useState(false);
    const [count, setcount] = useState(0);
    useEffect(() => {
        props.LikeList.map((likedata) => {
            if (likedata.LikeBy === Auth.Phone) {
                setisLike(true);
            }
        });
        setcount(props.LikeList.length);
    }, []);

    return (
        <>
            {isLike === false ? (
                <FcLikePlaceholder
                    size={30}
                    onClick={async () => {
                        await dispatch(likepost(props._id, Auth.Phone, props.maincode));
                        await setisLike(true);
                        // await props.getposts(props.maincode);
                        await setcount(count + 1);
                    }}
                />
            ) : (
                <FcLike
                    size={30}
                    onClick={async () => {
                        await dispatch(likepost(props._id, Auth.Phone, props.maincode));
                        await setisLike(false);
                        // await props.getposts(props.maincode);
                        await setcount(count - 1);
                    }}
                />
            )}
            {count}
        </>
    );
}
