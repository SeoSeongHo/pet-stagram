// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import eyeSlash from 'react-icons/lib/fa/eye-slash'
import eye from 'react-icons/lib/fa/eye'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';

type State = {
  username: string,
  password: string,
  secure: boolean,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};

class LoginView extends Component<Props, State> {
  constructor(props) {
    super(props)
    autoBind(this)
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
      this.props.onLoginPressed(this.state.username, this.state.password)
    }
  }
  toggleSecure() {
    this.setState({
      secure: !this.state.secure,
    })
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

export default LoginView
