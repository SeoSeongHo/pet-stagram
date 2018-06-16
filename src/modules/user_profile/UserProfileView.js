// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col, Card, CardText, Table,} from 'reactstrap'
import { CardImg, CardBody,
  CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import autoBind from 'react-autobind'
import DateTime from 'react-datetime'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import Navigator from '../top_navigator/navigatorContainer'
import CardDetailView from '../card_detail/CardDetailViewContainer'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';
import moment from 'moment'
import PropTypes from 'prop-types'
import './UserProfile.css'
import qs from "qs";
import queryString from "query-string";
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
  constructor(props) {
    super(props);
    autoBind(this)
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  state = {
    userBirthDay: '2018-04-07T09:09:59.496396Z',
    isEdit: false,
    getUser: true,
    picture:"",
    pictureURL:"",
  };
  componentWillMount() {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    try {
      console.log(queryString.parse(search),"query");
        this.props.getUserProfileRequest( search.query).then(()=> {
          this.setState({getUser: true})
          this.setState({introduceText: this.props.introduceText});
          this.setState({userProfileImage: this.props.userProfileImage});
          this.setState({userBirthDay: this.props.userBirthDay});
          this.props.followCheckRequest(Storage.get(KEYS.userEmail), this.props.userProfileName).catch((e)=>console.log(e))
        }).catch
        ((e) => console.log(e))
    }
    catch
      (e) {
      console.log(e);
    }
  }
  componentWillReceiveProps(nextProps) {
          const search = qs.parse(this.props.location.search.replace('?', ''));
          if(nextProps.location.search !== this.props.location.search) {
          this.props.getUserProfileRequest(queryString.parse(search).query).then(() => {
            this.setState({getUser: true})
            this.setState({introduceText: this.props.introduceText});
            this.setState({userProfileImage: this.props.userProfileImage});
            this.setState({userBirthDay: this.props.userBirthDay});
            this.props.followCheckRequest(Storage.get(KEYS.userEmail), this.props.userProfileName).catch((e)=>console.log(e))
          }).catch
          ((e) => console.log(e))
          }
  }
  renderPetProfileImage = () => {
    let table = []
    let img
    let i = 0;
    {this.props.pets.map((listValue,index)=> {
      table.concat(<div><img src={listValue.petProfileImage} onClick={() =>{
        this.props.history.push(`/petProfile/${listValue.Id}`)}}/>  <span>{listValue.petName}</span></div>)
    }
      )}
    return table
  }
  renderUserPicture = () => {
    let table = []
    let img
    let i = 0;
    // Outer loop to create parent
    {this.props.pets.map((pet,index)=>{pet.cards.map((listValue,index)=> {
        table.concat(
            <Card className="card2" body outline color="#ffe4a8" key={index}>
              <CardBody>
                <CardTitle>{listValue.title}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
              </CardBody>
              <img width="100%" src={listValue.pictures[0]} alt="Card image cap" />
              <CardBody>
                <CardText>{listValue.text}</CardText>
                <CardDetailView card_id={listValue.id}/>
              </CardBody>
            </Card>)
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
      <Col>
        <img src={this.props.userProfileImage}/>
        <span> {this.props.introduceText}</span>
        <span> {this.props.userBirthDay}</span>
      </Col>
        )
  }
  toggleEdit(){
    console.log(this.state.isEdit,"edit");
    if(this.state.isEdit===true)
    {
      this.props.editUserProfileRequest(this.state.introduceText,this.state.userBirthDay,this.state.userProfileImage).then( ()=>this.setState({isEdit: !this.state.isEdit})).catch((e)=>console.log(e))
    }
    else {
      this.setState({isEdit: !this.state.isEdit})
    }
}
  renderForm(){
    return(
      <Col>
        <input ref="file"
               type="file"
               name="user[image]"
               multiple="false"
               onChange={this.onDrop}/>
        <DateTime
          placeholder="when is your birthDay"
          onChange={(m) => {
            if (m instanceof moment) {
              this.setState({
                userBirthDay: m.format(),
              })
            }
          }}
        />
        <input value={this.state.introduceText} onChange={introduceText => {this.setState({introduceText: introduceText})}}/>
</Col>
        )
        }


  render() {
    if (!this.state.getUser) {
      return <div> there is no User on Username {this.props.match.params.userEmail}</div>
    } else if (this.props.userProfileName === Storage.get(KEYS.userEmail)) {
      return (
        <div>
          <Navigator/>
          <div className="cnt11">
            <Container className="cnt12">
              <div className="cnt12">
                <Row className="row1">
                  <Col sm={{size:4}}>
                    <img width="200" height="200" src={this.props.userProfileImage}/>
                  </Col>
                  <Col sm="8">
                    <Table>
                      <thead>
                      <tr>
                        <th>총 게시글</th>
                        <th>총 팔로잉</th>
                        <th>총 팔로워</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>{this.props.totalPost}</td>
                        <td>{this.props.totalFollowing}</td>
                        <td>{this.props.totalFollower}</td>
                      </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span> {this.props.userProfileName}</span>
                    <hr/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3>소개글</h3>
                    {!this.state.isEdit ?  this.renderNormal():this.renderForm()}
                    <hr/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.renderPetProfileImage}
                    <hr/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.renderUserPicture}
                  </Col>
                </Row>
                <Row className="btt13">
                  <Button onClick={()=>this.toggleEdit()}>{!this.state.isEdit? '수정' : '수정완료'}</Button>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      )
    } else{
      return (
        <div>
            <Navigator/>
          <div className="cnt11">
            <Container className="cnt12">
              <div className="cnt12">
          <Row className="row1">
            <Col sm={{size:4}}>
              <img width="200" height="200" src={this.props.userProfileImage}/>
            </Col>
            <Col sm="8">
              <Table>
                <thead>
                <tr>
                  <th>총 게시글</th>
                  <th>총 팔로잉</th>
                  <th>총 팔로워</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{this.props.totalPost}</td>
                  <td>{this.props.totalFollowing}</td>
                  <td>{this.props.totalFollower}</td>
                </tr>
                </tbody>
              </Table>
              <div>
                {this.props.userProfileName === Storage.get(KEYS.userEmail) ? (this.props.isFollow ?
                  <Button onClick={() => this.unFollowRequest()}> 언팔로우 </Button> :
                  <Button onClick={() => this.followRequest()}> 팔로우 </Button>) :
                  null}
                {this.props.userProfileName === Storage.get(KEYS.userEmail) ?
                  <Button onClick={() => console.log("send message")}> 메세지보내기 </Button> :
                  null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <span> {this.props.userProfileName}</span>
              <hr/>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>소개글</h3>
              <span>{this.props.introduceText}</span>
              <hr/>
            </Col>
          </Row>
                <Row>
                  <Col>
                    {this.renderPetProfileImage}
                    <hr/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.renderUserPicture}
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
        // <Container fluid>
        //   <Row>
        //     <Col>
        //       <span> {this.props.totalPost}</span>
        //       <span> 총 게시글</span>
        //     </Col>
        //     <span> {this.props.totalFollower}</span>
        //     <span> 총 팔로잉</span>
        //     <Col>
        //       <span> {this.props.totalFollowing}</span>
        //       <span> 총 팔로워</span>
        //     </Col>
        //   </Row>
        //   <Row>
        //     {this.props.userProfileName === Storage.get(KEYS.userEmail) ? (this.props.isFollow ?
        //       <Button onClick={() => this.unFollowRequest()}> 언팔로우 </Button> :
        //       <Button onClick={() => this.followRequest()}> 팔로우 </Button>) :
        //       null}
        //     {this.props.userProfileName === Storage.get(KEYS.userEmail) ?
        //       <Button onClick={() => console.log("send message")}> 메세지보내기 </Button> :
        //       null}
        //   </Row>
        //   <Row>
        //     <Col>
        //       <span> 유저 네임</span>
        //       <span> {this.props.userProfileName}</span>
        //     </Col>
        //     <Col>
        //       <span> 소개글</span>
        //       <span> {this.props.introduceText}</span>
        //     </Col>
        //   </Row>
        //   <Row>
        //     <Col>
        //       <img src={this.props.userProfileImage}/>
        //     </Col>
        //     <Col>
        //       {this.renderPetProfileImage()}
        //     </Col>
        //     <Col>
        //       {this.renderUserPicture()}
        //     </Col>
        //   </Row>
        // </Container>
      )
    }
  }
}


export default UserProfileView
