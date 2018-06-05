import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Jumbotron, Col, Row,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardText, CardTitle, Container} from 'reactstrap'
import classnames from 'classnames'
import './UserProfile.css'

type State ={
  username: string,
  password: string,
  userProfileImage: any,
  userBirth: Date,
  introduceText: string,
  petName: string,
  petProfileImage: any,
  petBirth: Date,
  introduceTextPet: string,
}

type Props ={

}

class UserAndPetProfileTest extends Component{
  constructor(props){
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state={
      username: '',
      password: '',
      userProfileImage: '',
      userBirth: '',
      introduceText: '',
      petName: '',
      petProfileImage: '',
      petBirth: '',
      introduceTextPet: '',
      activeTab: '1'
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserProfileImage = this.onChangeUserProfileImage.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
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

  onChangeUsername(e){
    this.setState({username: e.target.value})
  }

  onChangePassword(e){
    this.setState({password: e.target.value})
  }

  onChangeUserProfileImage(e){
    this.setState({userProfileImage: e.target.value})
  }

  onChangeBirthday(e){
    this.setState({userBirth: e.target.value})
  }

  onChangeIntroduceText(e){
    this.setState({introduceText: e.target.value})
  }

  onSignUpPressed(){

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
      <div style={{display: 'inline-block'}}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              User Info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Pet Info
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Jumbotron>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail" sm={2}>SignUp</Label>
                  <Col sm={12}>
                    <Input plaintext>Write down your information</Input>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={12}>
                    <Input type="email" name="email" className="signUpEmail" placeholder="write down your email" onChange={this.onChangeUsername}/>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={12}>
                    <Input type="password" name="password" className="signUpPassword" placeholder="write down your password" onChange={this.onChangePassword}/>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile" sm={2}>UserImage</Label>
                  <Col sm={12}>
                    <Input type="file" name="file" className="userProfileImage" onChange={this.onChangeUserProfileImage}/>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate"sm={2}>Birthday</Label>
                  <Col sm={12}>
                    <Input type="date" name="date" className="signUpDate" placeholder="write down your birthday" onChange={this.onChangeBirthday}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleText" sm={2}>Intro Text</Label>
                  <Col sm={8}>
                    <Input type="textarea" name="text" className="introduceText" onChange={this.onChangeIntroduceText}/>
                  </Col>
                </FormGroup>
              </Form>
              <Button color="success">Naver연동</Button>
              <Button color="primary">Facebook연동</Button>
              <div className="next1">
                <p>다음 탭으로 가서 펫 정보를 입력하세요.</p>
              </div>
            </Jumbotron>
          </TabPane>
          <TabPane tabId="2">
            <Jumbotron>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail" sm={2}>SignUp</Label>
                  <Col sm={12}>
                    <Input plaintext>Write down your pet's information</Input>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" sm={2}>PetName</Label>
                  <Col sm={12}>
                    <Input className="signUpPetName" placeholder="write down your petname"/>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile" sm={2}>PetImage</Label>
                  <Col sm={12}>
                    <Input type="file" name="file" className="petProfileImage" />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate"sm={2}>Birthday</Label>
                  <Col sm={12}>
                    <Input type="date" name="date" className="signUpPetDate" placeholder="write down your birthday" onChange={this.onChangeBirthday}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleText" sm={2}>Intro Text</Label>
                  <Col sm={8}>
                    <Input type="textarea" name="text" className="introducePetText"/>
                  </Col>
                </FormGroup>
                <Button color="primary" onClick={this.onSignUpPressed}>SignUp</Button>
                <Button href="/login" onClick={this.onCancelPressed}>Cancel</Button>
              </Form>
            </Jumbotron>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default UserAndPetProfileTest;
