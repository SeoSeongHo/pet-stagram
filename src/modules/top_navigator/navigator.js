import React, { Component } from 'react'
import {
  Row, Col, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, Button, InputGroupAddon
} from 'reactstrap'
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
  }

  componentWillMount() {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    this.setState({search});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const search = qs.parse(nextProps.location.search.replace('?', ''));
      this.setState({search});
    }
  }

  handleChange = (selectedOption) => {
     if(selectedOption.label!==undefined || selectedOption.value!==undefined) {
       this.setState({selectedOption: selectedOption},console.log(this.state));
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

  search(query) {
    this.props.getUserFilterRequest(query.query).then(()=> {
      this.props.filterUser &&
      this.props.history.push({pathname: '/search/', search: qs.stringify(query)});
    }).catch((e)=>console.log(e))
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
                        return {'value': `${users.userEmail}`, 'label': `userEmail: ${users.userEmail}`}
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
                <NavLink href="/userProfile/">
                  <img width="20" height="20" src={require('../../assets/images/man-user.png')} alt="Card image cap" />
                </NavLink>
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
