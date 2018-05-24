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
  keyword: string,
  secure: boolean,
};

type Props = {
  t: Function,
  loading: boolean,
  onSearchRequest: (keyword: string) => void
};

class SearchView extends Component<Props, State> {
  constructor(props,context) {
    super(...arguments);
    autoBind(this);
  }

  state = {
    keyword: '',
    secure: false,
  };
  componentDidMount() {
  }
  onChangeKeyword(e) {
    this.setState({ username: e.target.value })
  }

  onSearchPressed() {
    if (!this.state.keyword) {
      this.renderSearchError('no_keyword_input')
    } else {
      this.onSearchRequest(this.state.keyword)
    }
  }
  onSearchRequest(keyword){
    console.log(this.props,"this is searchProps");
    this.props.searchRequest(keyword).then(()=>{
      this.context.router.push('/homePage') // push to somewhere else later
    }).catch((e)=>console.log(e));
  }

  renderSearchError(text) {
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
            <Input placeholder="" onChange={this.onChangeKeyword} />
          </Col>
          <Col>
            <Button onClick={() => this.onSearchPressed()}>SEARCH</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

SearchView.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
  match: React.PropTypes.object
};

export default SearchView
