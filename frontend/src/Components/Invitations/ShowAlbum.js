import React, { useState, useEffect, useCallback } from "react";
import "./AlbumStyle.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import ImageGallery from 'react-image-gallery';
import Header from "../Helpers/Header/Header"
import MobileNav from "../Helpers/NavMobile/NavMobile.js";
import DesktopNav from "../Helpers/DesktopNav/DesktopNav.js";
import "react-image-gallery/styles/css/image-gallery.css";
import BlankSchedule from "../../Assets/NOAlbums.svg";
import { useSelector, useDispatch } from "react-redux";
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { useDropzone } from "react-dropzone";
import { uploadString } from "../../Utils/FileUpload_Download";
import { uploadfiletoalbum } from '../../Redux/DispatchFuncitons/Eventfunctions'
import SaveIcon from '@material-ui/icons/Save';
import Popup from "../Helpers/Popups/Popup";
import Addtoalbum from './Addtoalbum'
import Swiper from "react-id-swiper";

export default function ShowAlbum(props) {
    const [isUploaded, setisUploaded] = useState(false)
    const [Eventdata, setEventdata] = useState([])
    const [Name, setName] = useState("")
    const [IsAdmin, setIsAdmin] = useState(false)
    const [MainCode, setMainCode] = useState("")
    const [base, setbase] = useState("")
    const [images, setimages] = useState([])
    const [Prevfiles, setPrevfiles] = useState([])
    const dispatch = useDispatch();
    const [Type, setType] = useState("")
    const [show, setshow] = useState(false);
    let MyEvents = useSelector(
        (state) => state.Eventdata.myEvents
    );
    const Auth = useSelector(state => state.Auth)
    let myInvitations = useSelector(
        (state) => state.Eventdata.myInvitations
    );

    const params = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    }


    useEffect(async () => {
        debugger
        if (MyEvents.length === 0 && myInvitations.length === 0) {
            await dispatch(GetEvents());
            await dispatch(GetInvitations());
        } else {
            if (
                props.location.pathname ===
                "/MyEvents/albums/" +
                props.match.params.id
                && MyEvents.length > 0
            ) {
                console.log(MyEvents[0])
                await setEventdata(MyEvents[props.match.params.id][0].InvId.Album);
                await setbase("MyEvents");
                await setType(MyEvents[props.match.params.id][0].InvId.Type)
                await setName(MyEvents[props.match.params.id][0].Name)
                await setMainCode(MyEvents[props.match.params.id][0].MainCode)
                await setIsAdmin(MyEvents[props.match.params.id][0].Host.includes(Auth.Phone))
            } else if (
                props.location.pathname ===
                "/inv/albums/" +
                props.match.params.id
                && myInvitations.length > 0
            ) {
                console.log(myInvitations[0])
                await setEventdata(myInvitations[props.match.params.id][0].InvId.Album);
                await setbase("inv");
                await setType(myInvitations[props.match.params.id][0].InvId.Type)
                await setName(myInvitations[props.match.params.id][0].Name)
                await setMainCode(myInvitations[props.match.params.id][0].MainCode)
                await setIsAdmin(myInvitations[props.match.params.id][0].Host.includes(Auth.Phone))
            }
            console.log(Eventdata)
        }
    }, [MyEvents, myInvitations])
    useEffect(() => {
        let imagescpy = []
        let Prevfilescpy = []

        if (Eventdata.length > 0) {
            Eventdata.map(eve => {
                Prevfilescpy.push({ file: eve.file, type: eve.type })
                imagescpy.push({
                    file: eve.file,
                    type: eve.type
                })
            })

        }
        setimages(imagescpy)

        setPrevfiles(Prevfilescpy)
        console.log(images)
    }, [Eventdata])
    const save = async () => {
        let Album = []
        let uniqueurl =
            props.Type + Math.floor(100000 + Math.random() * 900000) + "/" + "Album/" + props.match.params.id + Eventdata[0].Name;
        images.map(async (fildeata, index) => {
            if (index > Prevfiles.length) {
                let newurl = await uploadString(fildeata.file, uniqueurl + "." + fildeata.type)
                Album.push({ file: newurl, type: fildeata.type })
            } else {
                Album.push({ file: fildeata.file, type: fildeata.type })
            }
        })
        console.log(Album)
        await dispatch(uploadfiletoalbum(Album, Eventdata[0].MainCode))
        setisUploaded(false)
    }
    return (
        <div>
            <div className="desktop-only w-100" >
                <Header className="desktop-only" />
            </div>
            <Addtoalbum
                toggleShowPopup={setshow}
                showPopup={show}
                images={Prevfiles}
                _id={props.match.params.id}
                eventname={Name}
                Type={Type}
                MainCode={MainCode}
            />
            <DesktopNav id={props.match.params.id} base={base} />
            <MobileNav id={props.match.params.id} base={base} />
            <Container style={{ margin: 0, padding: 0, marginTop: 0 }} fluid>
                <Row className="p-0 m-0">
                    <Col xs={10}>  <h3 className="p-5px">    Albums</h3></Col>
                    <Col xs={2}>
                        {IsAdmin === true ?
                            <IconButton onClick={() => { setshow(true) }} style={{ float: 'right' }}>
                                <AddPhotoAlternateIcon color="primary" style={{ fontSize: 25 }} />
                            </IconButton>
                            : <></>}




                    </Col>
                </Row>
                <br />
                {images.length === 0 ? <> <img src={BlankSchedule} className="blank-img" />
                    <br />
                    <h3 className="tac">Album not Added yet </h3></>
                    :
                    <Swiper {...params}>
                        {images.map(img => (
                            <div>
                                <Image alt="img" src={img.file} fluid className="image-gallery-image" />
                            </div>
                        ))}

                    </Swiper>}

            </Container>
        </div >
    )
}
