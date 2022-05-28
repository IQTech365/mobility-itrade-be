import React, { useState, useEffect } from "react";
import "./AddEvent.css";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import { Grid } from "@material-ui/core";
import check from "../../Assets/check-circle.1.png";
import Share from "../../Assets/Shareon.svg";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import axios from "axios";
import { url } from "../../Utils/Config";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from "react-redux";
import { WhatsappShareButton } from 'react-share'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

export default function AddEventSucess(props) {
  const Auth = useSelector(state => state.Auth)
  const [maincode, setmaincode] = useState(props.match.params.id);
  const [allevents, setallevents] = useState([]);
  const [mode, setmode] = useState();
  const [sharelink, setcodesharelink] = useState("");
  const [Watsapp, setWatsapp] = useState("");

  useEffect(() => {
    debugger
    axios
      .post(url + "event/viewinvitation", {
        MainCode: props.match.params.id,
      })
      .then(async (res) => {

        await setallevents(res.data.Events)
        if (res.data.Events[0].EntryWay === 'Code') {


          setcodesharelink(" https://mobily-invited-server.herokuapp.com/MyInvitations/" + maincode + "/" + res.data.Events[0].Name + "/" + res.data.Events[0].code)
          await setWatsapp(
            "Hi there ! You have been invited by " + Auth.Name + " to " + res.data.Events[0].Name + ". Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! " +
            " https://mobily-invited-server.herokuapp.com/MyInvitations/" + maincode + "/" + res.data.Events[0].Name + "/" + res.data.Events[0].code)
        } else {
          setcodesharelink(" https://mobily-invited-server.herokuapp.com/MyInvitations/" + maincode + "/" + res.data.Events[0].Name + "/" + res.data.Events[0].code)
          await setWatsapp(
            "Hi there ! You have been invited by " + Auth.Name + " to " + res.data.Events[0].Name + ". Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! " +
            " https://mobily-invited-server.herokuapp.com/MyInvitations/" +
            maincode)
        }

        await setmode(res.data.Events[0].EntryWay)
      });
  }, [])


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (data) => {
    await setcodesharelink(" https://mobily-invited-server.herokuapp.com/MyInvitations/" + maincode + "/" + data)
    await setWatsapp(
      "Hi there ! You have been invited by " + Auth.Name + " to " + allevents[0].Name + ". Share Your Excitement🤩 by Clicking the Below Link. Have Fun🤪! " +
      " https://mobily-invited-server.herokuapp.com/MyInvitations/" + maincode + "/" + allevents[0].Name + "/" + allevents[0].code)
    setAnchorEl(null);

  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={false} sm={3} md={3} />
      <Grid item xs={12} sm={6} md={6}>
        <Grid container spacing={0} className="p-10px">
          <Grid item xs={12}>
            <center>
              <img src={check} className="p-10px " />
            </center>
          </Grid>
          <Grid item xs={12}>
            <h2 className="tac theme-font">
              Your Invitation has been sucessfully created.
            </h2>
          </Grid>

          <Grid item xs={12}>
            <p className="w-100 tac"> Click on the Link to copy</p>
          </Grid>

          {allevents && allevents.length > 0 && allevents[0].EntryWay === "Code" ? <>


            <Grid
              item
              xs={12}
              className="tac m-b-25px clipboard"

            >
              <Grid container spacing={0}>
                <Grid item xs={10} md={11} className="link" onClick={(e) => { handleClick(e) }}>
                  {sharelink.substr(0, 40)}

                </Grid>
                <Grid item xs={2} md={1} className="p-t-10">
                  <FileCopyIcon className="v-t" onClick={() => {
                    navigator.clipboard.writeText(sharelink);
                  }} />
                </Grid>
              </Grid>
            </Grid>

          </> : <> <Grid
            item
            xs={12}
            className="tac m-b-25px clipboard"
            onClick={() => {
              navigator.clipboard.writeText(
                "https://mobily-invited-server.herokuapp.com/MyInvitations/" +
                maincode
              );
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={10} md={11} className="link">
                {"https://mobily-invited-server.herokuapp.com/xxxxx"}
              </Grid>
              <Grid item xs={2} md={1} className="p-t-10">
                <FileCopyIcon className="v-t" />
              </Grid>
            </Grid>
          </Grid></>}
          <Grid item xs={12} className="w-100 tac">
            Share on
          </Grid>
          <Grid item xs={12} className="tac m-b-25px">
            <center>

              <WhatsappShareButton
                url={" "}
                title={Watsapp}

                separator=" "
                className="Demo__some-network__share-button"
              >
                <img src={Share} className="" />
              </WhatsappShareButton>
            </center>
          </Grid>
          <Grid item xs={12} className="tac">
            Note: Only those who have invite can access.
          </Grid>
          <Grid item xs={12} className="down-float">
            <button
              className="btn save-event mt-10px"
              onClick={() => {
                history.push("/");
              }}
            >
              Done
            </button>
          </Grid>
        </Grid>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}

      >
        {allevents && allevents.map(eve => (
          <MenuItem onClick={() => handleClose(eve.Name + "/" + eve.code)}>{"Event Name: " + eve.Name + ", EventCode :" + eve.code}</MenuItem>
        ))}

      </Menu>
    </Grid>
  );
}
