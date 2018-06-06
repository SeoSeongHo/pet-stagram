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
  userProfileImage: any,
  userEmail: any,
  petProperty: string,
  petBirthDay: any,
};

type Props = {
  petName: string,
  id: any,
  users:[{
    userProfileImage: string,
    userEmail: string,
  }
    ],
  petProperty: string,
  loading: boolean,
  getPetProfileRequest: Function,
  editPetProfileRequest: Function,
};

class PetProfileView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this)
  }
  state = {
    isOwner: false,
    petBirthDay: '2018-04-07T09:09:59.496396Z',
    isEdit: false,
    getPet: false,
    picture:"",
    pictureURL:"",
  };

  renderUserProfileImage = () => {
  let table = []
    let img
    let i = 0;
    {this.props.users.map((listValue,index)=> {
        table.concat(<div><img src={listValue.userProfileImage} onClick={() =>{
          this.props.history.push(`/user/${listValue.userEmail}`)}}/>  <span>{listValue.userEmail}</span></div>)
      }
    )}
    return table
  };
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
  renderNormal(){
    return (
      <Column>
        <img src={this.props.petProfileImage}/>
        <span> {this.props.petProperty}</span>
        <span> {this.props.petBirthDay}</span>
        <Button onClick={() => this.toggleEdit()}> Edit </Button>
      </Column>
    )
  }
  toggleEdit(){
    if(this.state.isEdit===true)
    {
      this.props.editPetProfileRequest(this.props.id,this.state.petProperty,this.state.petBirthDay,this.state.petProfileImage).then( this.setState({isEdit: !this.state.isEdit})).catch((e)=>console.log(e))
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
                petBirthDay: m.format(),
              })
            }
          }}
        />
        <input value={this.state.petProperty} onChange={petProperty => {this.setState({petProperty: petProperty})}}/>
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
    this.setState({petProperty: this.props.petProperty});
    this.setState({petProfileImage: this.props.petProfileImage});
    this.setState({petBirthDay: this.props.petBirthDay});
  }
  componentWillMount() {
    try {
      this.props.getPetProfileRequest(this.props.match.params.id).then(() => {
        this.setState({getPet: true})
        this.setState({petProperty: this.props.petProperty});
        this.setState({petProfileImage: this.props.petProfileImage});
        this.setState({petBirthDay: this.props.petBirthDay});      }).catch((e) =>
        console.log(e));
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    {this.props.users.map((listValue,index)=> {
        if(listValue.userEmail===Storage.get(KEYS.userEmail)){
          this.setState({isOwner:true});
        }
      }
    )}
    if (!this.state.getPet) {
      return <div> there is no Pet on PetId: {this.props.match.params.id}</div>
    } else if (this.state.isOwner) {
      return (
        <Container fluid>
          <Row>
            <Col>
              <span> 나의 펫 이름</span>
              <span> {this.props.petName}</span>
            </Col>
            <Col>
              <span> 소개글</span>
              {this.introduceEditForm()}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderUserProfileImage()}
            </Col>
          </Row>
        </Container>
      )
    } else{
      return (
        <Container fluid>
          <Row>
            <Col>
              <span> 펫 이름</span>
              <span> {this.props.petName}</span>
            </Col>
            <Col>
              <span> 소개글</span>
              <span> {this.props.petProperty}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={this.props.petProfileImage}/>
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

export default PetProfileView
