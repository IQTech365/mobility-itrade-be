import "./App.css";
import "./Colors.css";
import "./Responsive.css";
import "./Scrollbar.css";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Redirector from "./Utils/Routing";
import history from "./Utils/History";
import { useSelector } from "react-redux";
import MobileAuth from "./Components/Auth/MobileAuth";
import Landingpage from "./Components/LandingPage/Landingpage";
import Home from "./Components/Home/Home";
import AddEvent from "./Components/AddEvent/AddEvent";
import Rsvp from "./Components/Invitations/RSVP/Rsvp";
import AddEventSucess from "./Components/AddEvent/AddEventSucess";
import Notification from "./Components/Notifications/Notification";
import EventDone from "./Components/EventDone/EventDone";
import AlertNotif from "./Components/Settings/AlertNotif/AlertNotif";
import EnterCode from "./Components/Entercode/Entercode";
import Chat from "./Components/Chat/Chat";
import Feed from "./Components/Feed/Feed";
import Comment from "./Components/Comments/Coments";
import Blankpages from "./Components/BlankPages/404";
import ShowSchedule from "./Components/Invitations/ShowSchedule";
import InvitaionviewToggler from "./Components/Invitations/InvitaionviewToggler";
import InvitaionMain from "./Components/Invitations/InvitationMain/InvitaionMain";
import Locationofline from "./Components/Location Offline/LocationOffline";
import Jitsi from "./Components/jitsi/Jitsivc";
import GuestList from "./Components/Guest/Guest";
import Hoxinvitation from "./Components/Invitations/hoxinvitation";
import SidebarMore from "./Components/Sidebar/SidebarMore";
import AdminSidebar from "./Components/Sidebar/AdminSidebar";
import EventAdmin from "./Components/Admin/EventAdmin";
import ManageGuest from "./Components/Guest/ManageGuest";
import EditEvent from "./Components/EditEvent/EditEvent";
import HomePage from "./Components/HomePage/HomePage";
import FD from "./Components/FD/Fd";
import ShowStory from './Components/Invitations/ShowStory';
import ShowAlbum from './Components/Invitations/ShowAlbum'
import Testc from './Components/Test/test'
function App() {
  const Auth = useSelector((state) => state.Auth);
  if (Auth.isLoggedIn === false) {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/test"
              component={Testc}
            />
            <Route
              exact
              path="/MyInvitations/:maincode"
              component={Hoxinvitation}
            />
            <Route
              exact
              path="/MyInvitations/:maincode/:Code"
              component={Hoxinvitation}
            />

            <Route exact path="/" component={HomePage} />
            <Route exact path="/*" component={Redirector} />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/MyInvitations/:maincode"
              component={Hoxinvitation}
            />
            <Route
              exact
              path="/MyInvitations/:maincode/:Code"
              component={Hoxinvitation}
            />
            <Route exact path="/MyEvents/eventpage/chat/:id" component={Chat} />
            <Route
              exact
              path="/MyEvents/GuestList/:id/:invno"
              component={GuestList}
            />
            <Route
              exact
              path="/MyEvents/Manage-GuestList/:id/:invno"
              component={ManageGuest}
            />
            <Route
              exact
              path="/MyEvents/Manage-Event/:id/:invno"
              component={EditEvent}
            />
            <Route
              exact
              path="/MyEvents/Admin/:id/:eid"
              component={EventAdmin}
            />
            <Route exact path="/MyEvents/Admin/:id" component={AdminSidebar} />
            <Route exact path="/MyEvents/More/:id" component={SidebarMore} />

            <Route
              exact
              path="/MyEvents/Location/:id/:event"
              component={Locationofline}
            />
            <Route
              exact
              path="/MyEvents/schedule/:id/:event"
              component={ShowSchedule}
            />
            <Route exact path="/MyEvents/rsvp/:id" component={Rsvp} />
            <Route
              exact
              path="/MyEvents/eventpage/:id"
              component={InvitaionviewToggler}
            />
            <Route exact path="/MyEvents/eventpage/feed/:id" component={Feed} />
            <Route exact path="/MyEvents/comments/:id/:_id" component={Comment} />
            <Route
              exact
              path="/MyEvents/albums/:id"
              component={ShowAlbum}
            />
            <Route
              exact
              path="/MyEvents/story/:id"
              component={ShowStory}
            />
            <Route
              exact
              path="/inv/albums/:id"
              component={ShowAlbum}
            />
            <Route
              exact
              path="/inv/story/:id"
              component={ShowStory}
            />
            <Route
              exact
              path="/inv/Manage-Event/:id/:invno"
              component={EditEvent}
            />
            <Route
              exact
              path="/inv/Admin/:id/:eid"
              component={EventAdmin}
            />
            {/* <Route
              exact
              path="/inv/Admin/:id/"
              component={AdminSidebar}
            /> */}
            <Route exact path="/inv/More/:id" component={SidebarMore} />
            <Route exact path="/inv/comments/:id/:_id" component={Comment} />
            <Route exact path="/inv/eventpage/feed/:id" component={Feed} />
            <Route exact path="/inv/videoconf/:id/" component={Jitsi} />
            <Route exact path="/inv/eventpage/chat/:id" component={Chat} />
            <Route
              exact
              path="/inv/Location/:id/:event"
              component={Locationofline}
            />
            <Route
              exact
              path="/inv/schedule/:id/:event"
              component={ShowSchedule}
            />
            <Route
              exact
              path="/inv/GuestList/:id/:invno"
              component={GuestList}
            />

            {/* <Route exact path="/inv/info/:id" component={Invitationlist} /> */}
            <Route exact path="/inv/rsvp/:id" component={Rsvp} />
            <Route
              exact
              path="/inv/eventpage/:id"
              component={InvitaionviewToggler}
            />
            <Route exact path="/MyEvents" component={Home} />
            <Route exact path="/MyInvitations" component={Home} />
            <Route
              exact
              path="/MyEvents/event-create-success/:id"
              component={AddEventSucess}
            />
            <Route exact path="/MyEvents/add-event" component={AddEvent} />
            <Route exact path="/add-event" component={AddEvent} />
            <Route exact path="/user-profile" component={AddEvent} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/*" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
