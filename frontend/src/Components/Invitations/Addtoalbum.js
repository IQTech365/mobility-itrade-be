
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "../../Assets/ChooseFromGallery.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import "../AddEvent/Extras/Extras.css";
import { Grid } from "@material-ui/core";
import "../Helpers/Popups/Popup.css";
import { Modal } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { uploadString } from '../../Utils/FileUpload_Download'
import { uploadfiletoalbum } from '../../Redux/DispatchFuncitons/Eventfunctions'
import { useSelector, useDispatch } from "react-redux";
export default function Addtoalbum(props) {
    const dispatch = useDispatch();
    const [album, setAlbum] = useState();
    const onDrop = useCallback(async (acceptedFiles) => {
        debugger
        let bkpalbum = [];
        let filetype = [];

        for (let i = 0; i < acceptedFiles.length; i++) {
            if (acceptedFiles[i].size > 5259265) {
            } else {
                let type = acceptedFiles[i].type.split("/");
                type = type[1];
                await getBase64(acceptedFiles[i]).then(async (data) => {
                    await bkpalbum.push({ file: data, type: type });
                    await filetype.push(type);
                });
            }
        }
        await setAlbum([...bkpalbum]);
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
    const cancel = () => {
        setAlbum([]);
    };
    const deleteimage = (i) => {
        let albumcpy = [...album];
        albumcpy = albumcpy.filter((item, index) => i !== index);
        setAlbum([...albumcpy]);
    };
    const save = async () => {
        debugger
        let albumcopy = [...props.images]
        let uniqueurl =
            props.Type + Math.floor(100000 + Math.random() * 900000) + "/" + "Album/";
        for (let i = 0; i < album.length; i++) {
            let newurl = await uploadString(album[i].file, uniqueurl + i + "." + album[i].type)
            await albumcopy.push({ file: newurl, type: album[i].type })
        }
        console.log(albumcopy)
        await dispatch(uploadfiletoalbum(albumcopy, props.MainCode))
        props.toggleShowPopup(false);
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={props.showPopup}
            >
                <div className="modal-card">
                    <IconButton
                        className="popup-close"
                        onClick={() => {
                            props.toggleShowPopup(false);
                        }}
                    >
                        <CancelIcon color="secondary" fontSize="large" />
                    </IconButton>

                    <div {...getRootProps()} style={{ width: '100%' }}>
                        <input {...getInputProps()} />
                        <img src={Gallery} className="w-100 uploadhere" />
                    </div>
                    <Grid item xs={12} className="ofh view">
                        <Grid container spacing={4}>
                            {album && album.length > 0
                                ? album.map((image, index) => (
                                    <Grid item xs={4} md={2} key={"img" + index}>
                                        <CancelIcon
                                            onClick={() => {
                                                deleteimage(index);
                                            }}
                                            color="secondary"
                                            className="delete-img"
                                        />
                                        <img src={image.file} className="w-100 preview" />
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
                </div>
            </Modal>
        </div>
    )
}
