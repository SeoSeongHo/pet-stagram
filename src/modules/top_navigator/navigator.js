import React, { Component } from 'react'
import {
  Row, Col, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap'
import './navigator.css'

export default class Navigator extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
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
                <NavLink href="/search">
                  <img width="30" height="30" src={require('../../assets/images/magnifying-glass.png')} alt="Card image cap" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/cardWrite">
                  <img width="30" height="30" src={require('../../assets/images/edit.png')} alt="Card image cap" />
                </NavLink>
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
