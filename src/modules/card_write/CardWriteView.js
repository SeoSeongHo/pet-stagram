// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';

type State = {
};

type Props = {
  pets: any,
};

class CardWriteView extends Component<Props, State> {
  constructor(props, context) {
    super(props, context);
    autoBind(this)
  }

  state = {
    getUser: false,
  };
  renderPetProfileImage = () => {
    let table = []
    let img
    let i = 0;
    // Outer loop to create parent
    for (img in this.props.petProfileImage) {
      if (this.props.petProfileImage.hasOwnProperty(img)) {
        table.push(<img src={img} onClick={() =>
          this.context.router.push(`/petProfile/${this.props.petUsernames[i]}`)}/>)
      }
      i++;
    }
    return table
  }
  renderUserPicture = () => {
    let table = []
    let img
    let i = 0;
    // Outer loop to create parent
    for (img in this.props.userProfileImage) {
      if (this.props.userProfileImage.hasOwnProperty(img)) {
        table.push(<img src={img}
                        onClick={() => this.context.router.push(`/cardDetail/${this.props.userProfileName}/${this.props.userProfileCardId[i]}`)}/>)
      }
      i++;
    }
    return table
  }

  followRequest() {
    this.props.followRequest(Storage.get(KEYS.username), this.props.userProfileName).then(() => this.props.followCheckRequest(Storage.get(KEYS.username), this.props.userProfileName)).catch((e) => console.log(e));
  }

  unFollowRequest() {
    this.props.unFollowRequest(Storage.get(KEYS.username), this.props.userProfileName).then(() => this.props.followCheckRequest(Storage.get(KEYS.username), this.props.userProfileName)).catch((e) => console.log(e));
  }

  componentWillMount() {
    try {
      this.props.getUserProfileRequest(this.context.match.url.username).then(() => {
        this.setState({getUser: true})
        this.props.followCheckRequest(Storage.get(KEYS.username), this.props.userProfileName);
      }).catch((e) =>
        console.log(e));

    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.getUser) {
      return <div> there is no User on Username {this.context.match.url.username}</div>
    } else {
      return (
        <Container fluid>
          <Row>
            <Col>
              <span> {this.props.totalPost}</span>
              <span> 총 게시글</span>
            </Col>
            <span> {this.props.totalFollower}</span>
            <span> 총 팔로잉</span>
            <Col>
              <span> {this.props.totalFollowing}</span>
              <span> 총 팔로워</span>
            </Col>
          </Row>
          <Row>
            {this.props.userProfileName === Storage.get(KEYS.username) ? (this.props.isFollow ?
              <Button onClick={() => this.unFollowRequest()}> 언팔로우 </Button> :
              <Button onClick={() => this.followRequest()}> 팔로우 </Button>) :
              null}
            {this.props.userProfileName === Storage.get(KEYS.username) ?
              <Button onClick={() => console.log("send message")}> 메세지보내기 </Button> :
              null}
          </Row>
          <Row>
            <Col>
              <span> 유저 네임</span>
              <span> {this.props.userProfileName}</span>
            </Col>
            <Col>
              <span> 소개글</span>
              <span> {this.props.introduceText}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={this.props.userProfileImage}/>
            </Col>
            <Col>
              {this.renderPetProfileImage()}
            </Col>
            <Col>
              {this.renderUserPicture()}
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

CardWriteView.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
  match: React.PropTypes.object
};
export default CardWriteView
