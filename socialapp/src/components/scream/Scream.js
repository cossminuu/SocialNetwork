import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
//Icons
import ChatIcon from "@material-ui/icons/Chat";

//MUI Stuff
import Typography from "@material-ui/core/Typography";

//Redux
import { connect } from "react-redux";

const styles = {};

class Scream extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     prevScrollpos: window.pageYOffset,
  //     visible: true,
  //   };
  // }

  // componentDidMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // }

  // handleScroll = () => {
  //   const { prevScrollpos } = this.state;
  //   const currentScrollPos = window.pageYOffset;
  //   const visible = prevScrollpos > currentScrollPos;
  //   this.setState({
  //     prevScrollpos: currentScrollPos,
  //     visible,
  //   });
  // };

  render() {
    dayjs.extend(relativeTime);
    const {
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    //or const classes = this.props.classes;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    return (
      <div
      // className={classnames("test", {
      //   test2: !this.state.visible,
      // })}
      >
        <div className="card">
          <img className="picture" alt="profilePic" src={userImage} />
          <div className="content">
            <div className="header">
              <img
                className="profile-pic"
                alt="profilePic"
                src={userImage}
              ></img>
              <div className="detail">
                <div className="name">
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                </div>
                <span className="posted">{dayjs(createdAt).fromNow()}</span>
              </div>
            </div>
            <div className="bodyScream">{body}</div>
            <div className="footer">
              <div className="like">
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
              </div>
              <div className="comment">
                <MyButton tip="comments" placement="top">
                  <ChatIcon fontSize="small" color="primary" />
                </MyButton>
                <span>{commentCount} Comments</span>
              </div>
              <div style={{ display: "flex" }}>
                <ScreamDialog
                  screamId={screamId}
                  userHandle={userHandle}
                  openDialog={this.props.openDialog}
                />
                <span>{deleteButton}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Scream.protoTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateTopProps = (state) => ({
  user: state.user,
});

export default connect(mapStateTopProps)(withStyles(styles)(Scream));
