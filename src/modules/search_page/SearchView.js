import React, {Component} from 'react'
import {InputGroup,InputGroupAddon, InputGroupText, Input, Container, Row,
  Col} from 'reactstrap'
import Navigator from "../top_navigator/navigator";

class ContactInfo extends Component{
  render(){
    return(
      <div>{this.props.contact.name}
        {this.props.contact.phone}</div>
    )
  }
}

class SearchView extends Component{
  constructor(props){
    super(props);
    this.state={
      exampleData:[
        {name: "aa", phone: "010-0000-0000"},
        {name: "bb", phone: "010-0000-0001"},
        {name: "cc", phone: "010-0000-0002"},
        {name: "dd", phone: "010-0000-0003"}
      ]
    }
  }

  render(){

    const mapToComponent = (data) => {
      return data.map((contact, i) => {
        return (<ContactInfo contact={contact} key={i}/>);
      })
    }

    return(
      <Container>
        <Row><Navigator/></Row>
        {mapToComponent(this.state.exampleData)}
      </Container>
    )
  }
}

export default SearchView;
