// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';
import moment from 'moment'

type State = {
  petProfileImage: any,
  petUsernames: any,
  userBirthDay: string,
  introduceText: string,
};

type Props = {
  userProfileImage: any,
  isFollow: boolean,
  pets: any,
  cards: any,
  userBirthDay: any,
  pets:[{
    Id: number,
    petProfileImage: string,
    petName: string,
  }
  ],
  userProfileName: string,
  introduceText: string,
  userProfileCardId: any,
  totalPost: number,
  totalFollowing: number,
  totalFollower: number,
  loading: boolean,
  followCheckRequest: Function,
  getUserProfileRequest: Function,
  sendMessageRequest: Function,
  followRequest: Function,
  unFollowRequest: Function,
  goToPetProfileRequest: Function,
  goToCardRequest: Function,
  editUserProfileRequest: Function,
};

class UserProfileView extends Component<Props, State> {
  constructor(props, context) {
    super(props, context);
    autoBind(this)
  }
  state = {
    userBirthDay: '2018-04-07T09:09:59.496396Z',
    isEdit: false,
    getUser: false,
    picture:"",
    pictureURL:"",
  };

  renderPetProfileImage = () => {
    let table = []
    let img
    let i = 0;
    {this.props.pets.map((listValue,index)=> {
      table.concat(<div><img src={listValue.petProfileImage} onClick={() =>{
        this.context.router.push(`/petProfile/${listValue.Id}`)}}/>  <span>{listValue.petName}</span></div>)
    }
      )}
    return table
  }
  renderUserPicture = () => {
    let table = []
    let img
    let i = 0;
    // Outer loop to create parent
    {this.props.cards.map((listValue,index)=> {
        listValue.map((picture,index)=>{ table.concat(<div><img src={picture} onClick={() =>{
          this.context.router.push(`/cardDetail/${listValue.Id}`)}}/>  <span>{listValue.title}</span></div>)
        })
    })}
    return table
  }
  onDrop(event) {
    console.log("on Drop");
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (event) {
      this.setState({
        pictures: file,
        picturesURL: reader.result,
      });
    }.bind(this);
    console.log(url) // Would see a path
  }

  followRequest() {
    this.props.followRequest(Storage.get(KEYS.userEmail), this.props.userProfileName).then(() => this.props.followCheckRequest(Storage.get(KEYS.userEmail), this.props.userProfileName)).catch((e) => console.log(e));
  }

  unFollowRequest() {
    this.props.unFollowRequest(Storage.get(KEYS.userEmail), this.props.userProfileName).then(() => this.props.followCheckRequest(Storage.get(KEYS.userEmail), this.props.userProfileName)).catch((e) => console.log(e));
  }
  renderNormal(){
    return (
      <Column>
        <img src={this.props.userProfileImage}/>
        <span> {this.props.introduceText}</span>
        <span> {this.props.userBirthDay}</span>
      <Button onClick={() => this.toggleEdit()}> Edit </Button>
      </Column>
        )
  }
  toggleEdit(){
    if(this.state.isEdit===true)
    {
      this.props.editUserProfileRequest(this.state.introduceText,this.state.userBirthDay,this.state.userProfileImage).then( this.setState({isEdit: !this.state.isEdit})).catch((e)=>console.log(e))
    }
  }
  renderForm(){
    return(
      <Column>
        <input ref="file"
               type="file"
               name="user[image]"
               multiple="false"
               onChange={this.onDrop}/>
        <DateTime
          placeholder="sinceWhen"
          onChange={(m) => {
            if (m instanceof moment) {
              this.setState({
                userBirthDay: m.format(),
              })
            }
          }}
        />
        <input value={this.state.introduceText} onChange={introduceText => {this.setState({introduceText: introduceText})}}/>
      <Button onClick={() => this.toggleEdit()}> Save </Button>
</Column>
        )
        }
  introduceEditForm() {
  if (this.state.isEdit) {
  return this.renderForm()
} else {
  return this.renderNormal()
}
}
  componentWillUpdate(){
    this.setState({introduceText: this.props.introduceText});
    this.setState({userProfileImage: this.props.userProfileImage});
    this.setState({userBirthDay: this.props.userBirthDay});
  }
  componentWillMount() {
    try {
      this.props.getUserProfileRequest(this.context.match.url.userEmail).then(() => {
        this.setState({getUser: true})
        this.setState({introduceText: this.props.introduceText});
        this.setState({userProfileImage: this.props.userProfileImage});
        this.setState({userBirthDay: this.props.userBirthDay});
        this.props.followCheckRequest(Storage.get(KEYS.userEmail), this.props.userProfileName);
      }).catch((e) =>
        console.log(e));
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.getUser) {
      return <div> there is no User on Username {this.context.match.url.userEmail}</div>
    } else if (this.props.userProfileName === Storage.get(KEYS.userEmail)) {
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
            <Col>
              <span> 나의 이름</span>
              <span> {this.props.userProfileName}</span>
            </Col>
            <Col>
              <span> 소개글</span>
              {this.introduceEditForm()}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderPetProfileImage()}
            </Col>
            <Col>
              {this.renderUserPicture()}
            </Col>
          </Row>
        </Container>
      )
    } else{
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
            {this.props.userProfileName === Storage.get(KEYS.userEmail) ? (this.props.isFollow ?
              <Button onClick={() => this.unFollowRequest()}> 언팔로우 </Button> :
              <Button onClick={() => this.followRequest()}> 팔로우 </Button>) :
              null}
            {this.props.userProfileName === Storage.get(KEYS.userEmail) ?
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

UserProfileView.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
  match: React.PropTypes.object
};

export default UserProfileView
