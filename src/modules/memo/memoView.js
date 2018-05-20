// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'

type State = {
  pet: string, // temp implementation of pet selecting. manual input.
  //date: any, // implement date later
  content: string,
};

type Props = {
  memos: any,
  //pets: any, // implement selecting pet later
  //getMemoRequest: Function, // implement get memos of user later
  onPostMemoRequest: (pet: string, content: string) => void
};

class memoView extends Component<Props, State> {
  constructor(props,context) {
    super(...arguments);
    autoBind(this)
  }

  state = {
    pet: '*-*-*-*', // default pet - no pet selected
    content: '',
  };
  componentDidMount() {
  }
  onChangePet(e) {
    this.setState({ pet: e.target.value })
  }
  onChangeContent(e) {
    this.setState({ content: e.target.value })
  }

  onSubmitMemoPressed() {

    if (!this.state.content) {
      this.renderMemoError('enter_memo_content')
    } else {
      this.onPostMemoRequest(this.state.pet, this.state.content)
    }
  }
  onPostMemoRequest(pet, content){
    console.log(this.props,"this is loginProps");
    this.props.loginRequest(pet, content).then(()=>{
      this.context.router.push('/homePage')
    }).catch((e)=>console.log(e));
  }

  renderMemoError(text) {
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
            <Input placeholder="PET" onChange={this.onChangePet} />
          </Col>
          <Col>
            <Input placeholder="CONTENT" onChange={this.onChangeContent} />
          </Col>
          <Col>
            <Button onClick={() => this.onSubmitMemoPressed()}>submit</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

memoView.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default memoView
