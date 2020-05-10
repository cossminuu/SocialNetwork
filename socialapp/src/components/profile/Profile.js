import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import ProfileSkeleton from "../../util/ProfileSkeleton";

import Zoom from "react-reveal/Zoom";

import Fade from "react-reveal/Fade";

//Redux stuff
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

//MUI stuff
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import MyButton from "../../util/MyButton";

const styles = (theme) => ({
  ...theme.spreadThis,
});

// const activeFromPx = 20;
// const activeToPx = 100;

class Profile extends Component {
  // state = {
  //   isActive: false,
  // };

  // componentDidMount = () => {
  //   window.addEventListener("scroll", this.handleScroll);
  //   this.handleScroll();
  // };

  // handleScroll = () => {
  //   const { top } = this.wrapRef.getBoundingClientRect();
  //   if (top > activeFromPx && top < activeToPx && !this.state.isActive) {
  //     this.setState({ isActive: true });
  //   }
  //   if ((top <= activeFromPx || top >= activeToPx) && this.state.isActive) {
  //     this.setState({ isActive: false });
  //   }
  // };
  // setWrapRef = (ref) => {
  //   this.wrapRef = ref;
  // };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    // const { isActive } = this.state;
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let ProfileMarkupScroll = !loading ? (
      authenticated ? (
        <div className="profile profile_onScroll">
          <div className={classes.profile} style={{ display: "flex" }}>
            <div className="image-wrapper">
              <Fade top delay={300}>
                {" "}
                <img
                  src={imageUrl}
                  alt="profile"
                  className="profile-image_onScroll"
                />
              </Fade>

              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
                placement="top"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {location && (
                <React.Fragment>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                  <hr />
                </React.Fragment>
              )}
            </div>
            <MyButton tip="Logout" onClick={this.handleLogout} placement="top">
              <KeyboardReturn color="secondary" />
            </MyButton>
            <EditDetails />
          </div>
        </div>
      ) : (
        <Paper className={classes.paper} style={{ marginBottom: "35px" }}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    let profileMarkup = (
      <div className="profile">
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
                placement="top"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <React.Fragment>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                  <hr />
                </React.Fragment>
              )}
              {website && (
                <React.Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </React.Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MM YYYY")}</span>
              {window.innerWidth < 500 ? <p>under 500</p> : <p>over 500</p>}
            </div>
            <hr />
            <hr />
            <MyButton tip="Logout" onClick={this.handleLogout} placement="top">
              <KeyboardReturn color="secondary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      </div>
    );

    return (
      <div ref={this.setWrapRef}>
        {
          /*isActive &&*/ !loading && authenticated
            ? profileMarkup
            : ProfileMarkupScroll
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = { logoutUser, uploadImage };
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
