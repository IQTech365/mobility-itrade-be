import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import TitleIcon from '@material-ui/icons/Title';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Rnd } from "react-rnd";
import zIndex from '@material-ui/core/styles/zIndex';
import { TextField, Grid, Modal, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Popup from '../Helpers/Popups/Popup'
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import domtoimage from 'dom-to-image';
export default function Photoeditor(props) {
    const [bgimg, setbgimg] = useState('url(https://firebasestorage.googleapis.com/v0/b/mobilly-invite.appspot.com/o/Mob-invited%2F123.jpeg?alt=media&token=c38154e1-e59c-4fc4-93c1-2d82abf536af)')
    const [textcolor, settextcolor] = useState('red')
    const [Alltexts, setAlltexts] = useState([])
    const [currenttext, setcurrenttext] = useState({
        text: '',
        size: 32,
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 30,
        width: 200,
        height: 60
    })
    const [show, setshow] = useState(false);

    const getImage = () => {
        var node = document.getElementById('imagecontainer', { height: window.innerHeight, widht: window.innerWidth, quality: 2.0 });
        domtoimage.toPng(node)
            .then(function (dataUrl) {
                console.log(dataUrl)
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }


    return (
        <>
            <IconButton className="editimagebuttonback" style={{ top: '5px' }}><ArrowBackIcon /></IconButton>
            <IconButton className="editimagebuttons" style={{ top: '5px' }} onClick={() => { setshow(true) }}><EditIcon /></IconButton>
            <IconButton className="editimagebuttons" style={{ top: '90vh' }} onClick={() => {
                getImage()
            }}><DoneIcon /></IconButton>

            <Popup
                component={currentTextHandler}
                toggleShowPopup={setshow}
                showPopup={show}
                MainCode={setcurrenttext}
                eventCode={setAlltexts}
                url={currenttext}
                Groups={textcolor}
                showall={Alltexts}
            />
            <div id="imagecontainer" style={{
                backgroundImage: bgimg,
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundColor: 'currentcolor'
            }}>
                {Alltexts.map((singletext, index) => (
                    <Rnd
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "none",
                            zIndex: 1,
                            color: textcolor,
                            fontSize: singletext.size
                        }}

                        default={{
                            x: 0,
                            y: 0,
                            width: singletext.width,
                            height: singletext.height
                        }}

                        position={{ x: singletext.x, y: singletext.y }}
                        onDragStop={(e, d) => {
                            let alltextcpy = [...Alltexts]
                            alltextcpy[index] = { ...singletext, x: d.x, y: d.y }
                            setAlltexts(alltextcpy);
                            console.log(alltextcpy)
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            let alltextcpy = [...Alltexts]
                            alltextcpy[index] = { ...singletext, x: position.x, y: position.y, widht: ref.style.width, height: ref.style.height }
                            console.log(alltextcpy)
                            setAlltexts(alltextcpy);
                        }}

                    >
                        {singletext.text}

                    </Rnd>
                ))}
                {/* {bgimg === "" ?
                    <div style={{ width: '100vw', height: '100vh', position: 'fixed', background: 'red', zIndex: 0 }} />
                    : <img src={bgimg} style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 0, objectFit: 'contain', left: 0 }} />} */}

            </div>
        </>
    )
}


export function currentTextHandler(props) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <input type="text" className="w-100 "
                    placeholder="Add text here" value={props.url.text}
                    onChange={(e) => { props.MainCode({ ...props.url, text: e.target.value }) }}
                    style={{ color: props.Groups, fontSize: props.url.size }}
                /><br />
            </Grid>

            <Grid item xs={8}>
                <Grid item xs={12}>
                    <div className="Cirlce tar  fl">
                        <RemoveCircleOutlineIcon
                            className="l-blue-t "
                            fontSize="large"
                            onClick={() => {
                                props.MainCode({ ...props.url, size: props.url.size - 1 });
                            }}
                        />
                    </div>
                    <div className="white box  fl">{props.url.size}</div>
                    <div className="Cirlce tal  fl">

                        <AddCircleOutlineIcon
                            className="l-blue-t"
                            fontSize="large"
                            onClick={() => {
                                props.MainCode({ ...props.url, size: props.url.size + 1 });
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" className="t-white l-blue"
                    onClick={async () => {
                        console.log([...props.showall, props.url])
                        await props.eventCode([...props.showall, props.url]);
                        await props.hide(false);
                        await props.MainCode({
                            text: '',
                            size: 32,
                            x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 + 30,
                            width: 200,
                            height: 60
                        })
                    }}
                >Done</Button>
            </Grid>
        </Grid>
    )
}
