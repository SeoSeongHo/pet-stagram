// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import eyeSlash from 'react-icons/lib/fa/eye-slash'
import eye from 'react-icons/lib/fa/eye'
import { Link, browserHistory } from 'react-router'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';
import {
  withRouter
} from 'react-router-dom'

type State = {
  username: string,
  password: string,
  secure: boolean,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginRequest: (username: string, password: string) => void
};

class LoginView extends Component<Props, State> {
  constructor(props,context) {
    super(...arguments);
    autoBind(this);
  }

  state = {
    username: '',
    password: '',
    secure: false,
  };
  componentDidMount() {
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }

  onLoginPressed() {
    if (!this.state.username) {
      this.renderLoginError('enter_your_login_ID')
    } else if (!this.state.password) {
      this.renderLoginError('enter_your_password')
    } else {
      this.onLoginRequest(this.state.username, this.state.password)
    }
  }
  onLoginRequest(username, password){
    console.log(this.props,"this is loginProps");
    this.props.loginRequest(username, password).then(()=>{
      this.context.router.push('/homePage')
    }).catch((e)=>console.log(e));
  }

  renderLoginError(text) {
    if (text) {
      return (
        <Alert> {text}</Alert>
      )
    }
    return (
      null
    )
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Input placeholder="USERNAME" onChange={this.onChangeUsername} />
          </Col>
          <Col>
            <Input type="password" placeholder="PASSWORD" onChange={this.onChangePassword} />
          </Col>
          <Col>
            <Button onClick={() => this.onLoginPressed()}>LOGIN</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

LoginView.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
  match: React.PropTypes.object
};

export default LoginView
