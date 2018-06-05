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
    };
  }
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
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
      this.props.signUpRequest(this.state.email, this.state.password).then(
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

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="with a placeholder"  value={this.state.email}
                 onChange={this.handleChange}/>
          <Button onClick={this.checkDuplicate}>check Duplicate!</Button>
          { this.state.duplicate >1 ? <UncontrolledAlert color="pink">
            there is duplicate
            </UncontrolledAlert> : <UncontrolledAlert color="green">
            there is no duplicate
          </UncontrolledAlert>}
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="password placeholder"     value={this.state.password}
                 onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">confirmPassword</Label>
          <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirmPassword placeholder"     value={this.state.confirmPassword}
                 onChange={this.handleChange}/>
        </FormGroup>
        <Button type="submit">Submit</Button>
        {
          this.state.error ?  <Text> error: {this.state.error} </Text>
            : null
            }
      </Form>
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
