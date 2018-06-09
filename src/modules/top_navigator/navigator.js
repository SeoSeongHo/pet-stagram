import React, { Component } from 'react'
import {
  Row, Col, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, Button, InputGroupAddon
} from 'reactstrap'
import './navigator.css'
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
      }
    }
  }
  componentWillMount() {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    this.setState(search);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const search = qs.parse(nextProps.location.search.replace('?', ''));
      this.setState(search);
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  search(query) {
    console.log(qs.stringify(query),"    ",query);
    console.log(query);
    this.props.history.push({ pathname: '/search/' , search: qs.stringify(query) });
  }
  render() {
    return (
      <Container>
        <Navbar color="white" light expand="md">
          <NavbarBrand href="/homepage/">
            <img width="30" height="30" src={require('../../assets/images/instagram.png')} alt="Card image cap" />
            <img className="imglogo1" width="150" height="50" src={require('../../assets/images/mainlogo.png')} alt="Card image cap" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <InputGroup size="sm" className="inp1">
                <Input className="inp2" type="email" name="email" placeholder="검색" value={this.state.search.query} onChange={(e)=>{this.setState({search: {query: e.target.value}},()=>console.log(this.state));
                console.log(this.state)}} />
                <InputGroupAddon addonType="append">
                  <Button className="btt11" color="white" onClick={()=>this.search(this.state.search)}><img width="27" height="27" src={require('../../assets/images/magnifying-glass.png')} alt="Card image cap" /></Button>
                </InputGroupAddon>
                </InputGroup>
              </NavItem>
              <NavItem>
                <CardWriteView/>
              </NavItem>
              <NavItem>
                <NavLink href="/cardDetail/">
                  <img width="30" height="30" src={require('../../assets/images/like.png')} alt="Card image cap" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/userProfile/">
                  <img width="30" height="30" src={require('../../assets/images/man-user.png')} alt="Card image cap" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}
export default withRouter(Navigator);
