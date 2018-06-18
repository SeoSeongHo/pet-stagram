import React, { Component } from 'react'
import Storage, { KEYS } from '../../utils/petStagramStorage'
import {clearAuthenticationToken} from '../../utils/authentication'
import {
  Row, Col, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, Button, InputGroupAddon
} from 'reactstrap'
import autoBind from 'react-autobind'
import './navigator.css'
import Select from 'react-select'
import CardWriteView from '../card_write/CardWriteViewContainer'
import qs from 'qs'
import { withRouter } from 'react-router-dom';
export class Navigator extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      search: {
        query:"",
      },
      selectedOption: '',
    }

    autoBind(this);
  }

  componentWillMount() {
    this.props.getUserFilterRequest("").then(()=> {console.log(this.props.users,"users")
      }
    ).catch((e)=>console.log(e))
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange = (selectedOption) => {
     if(selectedOption.label!==undefined || selectedOption.value!==undefined) {
       this.setState({selectedOption: selectedOption},console.log(this.state),"thisState");
       this.setState({search: {query: selectedOption.value}},()=> this.props.history.push({pathname: '/search/', search: qs.stringify(this.state.search)}));
     }
     // selectedOption can be null when the `x` (close) button is clicked
     if (selectedOption) {
       console.log(`Selected: ${selectedOption.label}`);
       console.log(`Selected: ${selectedOption.value}`);
     }
    }

  handleInputChange = (e) => {
   this.props.getUserFilterRequest(e).then(()=> {
    }
  ).catch((e)=>console.log(e))
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  onLogoutPressed(){
    if(window.confirm("로그아웃 하시겠습니까?")){
      clearAuthenticationToken();
      this.props.history.push('/login');
    }
  }

  search(query) {
    console.log(query.query,"query");
      this.props.history.push({pathname: '/search', search: qs.stringify(query)},()=>this.props.getUserProfileRequest(qs.parse(this.props.location.search.replace('?', '').query)))
  }
  render() {
    return (
      <div className="nav1">
      <Container>
        <Navbar color="white" light expand="md">
          <NavbarBrand href="/homepage/">
            <Row>
              <Col sm="3">
            <img width="20" height="20" src={require('../../assets/images/instagram.png')} alt="Card image cap" />
            <img className="imglogo1" width="100" height="30" src={require('../../assets/images/mainlogo.png')} alt="Card image cap" />
              </Col>
            </Row>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="Navi1">
                  <Select
                    className="sel1"
                    placeholder="검색"
                    name="form-field-name"
                    ref={(ref) => { this.select = ref; }}
                    value={this.state.selectedOption}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    options={
                      _.map(this.props.users, (users)=> {
                        return {'value': `${users}`, 'label': `userEmail: ${users}`}
                      })
                    }
                  />
              </NavItem>
              <NavItem className="Navi1">
                  <Button className="btt11" color="white" onClick={()=>this.search(this.state.search)}><img width="20" height="20" src={require('../../assets/images/magnifying-glass.png')} alt="Card image cap" /></Button>
              </NavItem>
              <NavItem>
                <CardWriteView/>
              </NavItem>
              <NavItem>
                <NavLink href="/cardDetail/">
                  <img width="20" height="20" src={require('../../assets/images/like.png')} alt="Card image cap" />
                </NavLink>
              </NavItem>
              <NavItem>
                  <Button className="btt11" color="white" onClick={()=>this.search({query: Storage.get(KEYS.userEmail)})}>
                  <img width="20" height="20" src={require('../../assets/images/man-user.png')} alt="Card image cap" />
                  </Button>
              </NavItem>
              <NavItem>
                <Button className="btt12" color="white" onClick={this.onLogoutPressed}>
                  <img width="25" height="25" src={require('../../assets/images/logout.png')} alt="Card image cap" />
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
      </div>
    )
  }
}
export default withRouter(Navigator);
