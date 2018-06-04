import React, { Component } from 'react'
import {
  Row, Col, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap'

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
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/homepage/">petstagram</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>검색</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  내가 팔로우 하는 사람
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    내 주변 인기글
                  </DropdownItem>
                  <DropdownItem>
                    전체 글 중 인기글
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/cardDetail/">하트</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/userProfile/">프로필</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}
