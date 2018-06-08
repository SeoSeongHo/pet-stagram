import React, {Component} from 'react'
import {InputGroup,InputGroupAddon, InputGroupText, Input, Container, Row,
  Col} from 'reactstrap'
import Navigator from "../top_navigator/navigator";
import autoBind from 'react-autobind'
import qs from "qs";
import { withRouter } from "react-router-dom"

type Props = {
  cards: any,
  getCardListRequest: Function,
};

class ContactInfo extends Component{
  render(){
    return(
      <div>{this.props.contact.name}
        {this.props.contact.phone}</div>
    )
  }
}

export class SearchView extends Component<Props, State>  {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      exampleData:[
        {name: "aa", phone: "010-0000-0000"},
        {name: "bb", phone: "010-0000-0001"},
        {name: "cc", phone: "010-0000-0002"},
        {name: "dd", phone: "010-0000-0003"}
      ]
    }
  }

  componentWillMount() {
    const search = this.props.location.search
    this.props.getCardListRequest(search).catch((e)=>console.log(e));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const search = qs.parse(nextProps.location.search.replace('?', ''));
      this.props.getCardListRequest(search).catch((e)=>console.log(e));
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

export default withRouter(SearchView);
