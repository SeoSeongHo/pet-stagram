import React, { Component } from "react";
import { Button, Form, FormGroup, Label, UncontrolledAlert, Input, FormText } from 'reactstrap';
import autoBind from "react-autobind";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isLoading: false,
      email: "",
      error: null,
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      duplicate:0,
      userProfileImage: null,
      userBirthDay: '',
      introduceText: '',
      username: '',
      petName: '',
      petProfileImage: null,
      petBirthDay: '',
      introduceTextPet: '',
      activeTab: '1'
    };
  }
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
        this.state.username.length >0 &&
        this.state.petBirthDay && this.state.userBirthDay
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.signUpRequest(this.state.email, this.state.password,
        this.state.username,this.state.userProfileImage,this.state.userBirthDay,this.state.petName, this.state.petProfileImage,this.state.petBirthDay).then(
        this.context.router.push('/homePage')
      ).catch((e) => { console.log(e);
        this.setState({error:e});})
    }
    else if(this.state.email.length>0){
      this.setState({error:"email is too short"});
    }
    else if(this.state.password.length>0){
      this.setState({error:"password is too short"});
    }
    else if(this.state.password===this.state.confirmPassword){
      this.setState({error:"confirmPassword is not equal"});
    }
  }

  checkDuplicate(){
    this.props.checkDuplicateRequest(this.state.email).then(()=>this.setState({duplicate:1})).catch(()=>{
      this.setState({error:"Duplicate Error"});
      this.setState({duplicate:2})
    })
  }

  handleConfirmationSubmit(event){
    event.preventDefault();
    this.setState({ isLoading: true });
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
    this.setState({userBirthDay: e.target.value})
  }

  onChangePetBirthday(e){
    this.setState({petBirthDay: e.target.value})
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

  onSignUpPressed(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.signUpRequest(this.state.email, this.state.password,this.state).then(()=>{
        this.props.createPetRequest().then(()=> this.context.router.push('/homePage')).catch((e)=>{console.log(e)})
      }
      ).catch((e) => { console.log(e);
        this.setState({error:e});})
    }
    else if(this.state.email.length>0){
      this.setState({error:"email is too short"});
    }
    else if(this.state.password.length>0){
      this.setState({error:"password is too short"});
    }
    else if(this.state.password===this.state.confirmPassword){
      this.setState({error:"confirmPassword is not equal"});
    }
  }
  onCancelPressed(){
    this.setState({
      isLoading: false,
      email: "",
      error: null,
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      duplicate:0,
      userProfileImage: '',
      userBirthDay: '',
      introduceText: '',
      username: '',
      petName: '',
      petProfileImage: '',
      petBirthDay: '',
      introduceTextPet: ''}, ()=>this.context.router.push('/login'))
  }

  renderForm() {
    return (
      <Container className="cnt1">
        <Row>
          <Col className="signup1" xs="8" sm={{size: 5, offset:4}}>
            <Card body outline color = "secondary">
              <img width="100%" src={require('../../assets/images/mainlogo.png')} alt="Card image cap" />
              <Button className="bt1" color="success">Naver연동</Button>
              <Button className="bt1" color="primary">Facebook연동</Button>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup >
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
                <Button color="primary" onClick={this.handleSubmit}>SignUp</Button>
                <Button href="/login" onClick={this.onCancelPressed}>Cancel</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
      </div>
    );
  }
}
