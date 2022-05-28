import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import UserData from "../Helpers/UserData/UserData";
import './Feed.css'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
export default function AddTags(props) {
    const [Tags, setTags] = useState(props.url)
    const classes = useStyles();
    useEffect(() => {
        setTags([...props.url])
        console.log(props.MainCode)
    }, [props.url])

    const addTags = (data) => {
        setTags([...Tags, data])
    }
    const removeTags = (data) => {
        let Tagscpy = [...Tags];
        Tagscpy = Tagscpy.filter((tag) => {
            return data != tag;
        });
        setTags([...Tagscpy])
    }

    return (
        <div><h3>Add Tags</h3>

            <List className={classes.root}>
                {props.MainCode.map(Participant => (
                    <ListItem alignItems="flex-start" className={Tags.includes(Participant) ? "selected m-5px" : "m-5px"}
                        onClick={() => { Tags.includes(Participant) ? removeTags(Participant) : addTags(Participant) }}>
                        <ListItemAvatar>
                            <UserDataUrl showIcon={true} Phone={Participant} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<UserDataUrl showName={true} Phone={Participant} />}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >

                                    </Typography>

                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}


            </List>
            <button className="btn btn-primary" onClick={() => { props.showall([...Tags]); props.hide(false) }}>
                Save
            </button>
        </div >
    );
}