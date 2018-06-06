import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Jumbotron, Col, Row,
TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, CardFooter, CardText, CardTitle, Container} from 'reactstrap'
import classnames from 'classnames'
import './signUpView.css'
import autobind from 'react-autobind'

type State ={
  username: string,
  password: string,
  userProfileImage: any,
  userBirthDay: Date,
  introduceText: string,
  petName: string,
  petProfileImage: any,
  petBirth: Date,
  introduceTextPet: string,
}

type Props ={

}

class SIgnUpView extends Component{
  constructor(props){
    super(props);
    autobind(this);
    this.toggle = this.toggle.bind(this);
    this.state={
      email: '',
      password: '',
      userProfileImage: '',
      userBirth: '',
      introduceText: '',
      username: '',
      petName: '',
      petProfileImage: '',
      petBirth: '',
      introduceTextPet: '',
      activeTab: '1'
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserProfileImage = this.onChangeUserProfileImage.bind(this);
    this.onChangeUserBirthday = this.onChangeUserBirthday.bind(this);
    this.onChangeIntroduceText = this.onChangeIntroduceText.bind(this);
    this.onSignUpPressed = this.onSignUpPressed.bind(this);
    this.onCancelPressed = this. onCancelPressed.bind(this);
  }

  toggle(tab){
    if(this.state.activeTab !== tab){
      this.setState({
        activeTab: tab
      });
    }
  }

  onChangeEmail(e){
    this.setState({email: e.target.value})
  }

  onChangePassword(e){
    this.setState({password: e.target.value})
  }

  onChangeUserProfileImage(e){
    this.setState({userProfileImage: e.target.value})
  }

  onChangePetProfileImage(e){
    this.setState({petProfileImage: e.target.value})
  }

  onChangeUserBirthday(e){
    this.setState({userBirth: e.target.value})
  }

  onChangePetBirthday(e){
    this.setState({petBirth: e.target.value})
  }

  onChangeIntroduceText(e){
    this.setState({introduceText: e.target.value})
  }

  onChangeUsername(e){
    this.setState({username: e.target.value})
  }

  onChangePetName(e){
    this.setState({petName: e.target.value})
  }

  onSignUpPressed() {
  }

  onCancelPressed(){
    this.setState({username: '',
      password: '',
      userProfileImage: '',
      userBirth: '',
      introduceText: '',
      petName: '',
      petProfileImage: '',
      petBirth: '',
      introduceTextPet: '',
      activeTab: '1'})
  }

    render(){
      return(
        <Container className="cnt1">
        <Row>
        <Col className="signup1" xs="8" sm={{size: 5, offset:4}}>
    <Card body outline color = "secondary">
        <img width="100%" src={require('../../assets/images/mainlogo.png')} alt="Card image cap" />
        <Button className="bt1" color="success">Naver연동</Button>
      <Button className="bt1" color="primary">Facebook연동</Button>
      <CardBody>
      <Form>
      <FormGroup>
      <Label for="exampleEmail" sm={5}>Email</Label>
      <Col sm={12}>
        <Input type="email" name="email" className="signUpEmail" placeholder="write down your email" onChange={this.onChangeEmail}/>
      </Col>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword" sm={5}>Password</Label>
        <Col sm={12}>
          <Input type="password" name="password" className="signUpPassword" placeholder="write down your password" onChange={this.onChangePassword}/>
        </Col>
      </FormGroup>
      <FormGroup>
      <Label for="exampleName" sm={5}>UserName</Label>
      <Col sm={12}>
        <Input type="name" name="name" className="userName" placeholder="write down your name" onChange={this.onChangeUsername}/>
      </Col>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile" sm={5}>UserImage</Label>
        <Col sm={12}>
          <Input type="file" name="file" className="userProfileImage" onChange={this.onChangeUserProfileImage}/>
        </Col>
      </FormGroup>
      <FormGroup>
      <Label for="exampleDate"sm={6}>UserBirthday</Label>
      <Col sm={12}>
        <Input type="date" name="date" className="signUpDate" placeholder="write down your birthday" onChange={this.onChangeUserBirthday}/>
      </Col>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail" sm={5}>PetName</Label>
        <Col sm={12}>
          <Input className="signUpPetName" placeholder="write down your petname" onChange={this.onChangePetName}/>
        </Col>
      </FormGroup>
      <FormGroup>
      <Label for="exampleFile" sm={5}>PetImage</Label>
      <Col sm={12}>
        <Input type="file" name="file" className="petProfileImage" onChange={this.onChangePetProfileImage}/>
      </Col>
      </FormGroup>
      <FormGroup>
        <Label for="exampleDate"sm={5}>PetBirthday</Label>
        <Col sm={12}>
          <Input type="date" name="date" className="signUpDate" placeholder="write down your pet's birthday" onChange={this.onChangePetBirthday}/>
        </Col>
      </FormGroup>
      </Form>
    </CardBody>
      <CardFooter>
        <Button color="primary" onClick={this.onSignUpPressed}>SignUp</Button>
        <Button href="/login" onClick={this.onCancelPressed}>Cancel</Button>
      </CardFooter>
    </Card>
    </Col>
    </Row>
    </Container>
      );
    }
}

export default SIgnUpView;
