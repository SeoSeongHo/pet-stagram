// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import Navigator from '../top_navigator/navigator'
import './cardView.css'
import CardDetailView from "../card_detail/CardDetailViewContainer";
import CardWriteView from "../card_write/CardWriteViewContainer"

type State = {
  username: string,
  password: string,
  secure: boolean,
};

type Props = {
  cards: any,
  loading: boolean,
};
class MainPageView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this)
    this.state = {
      list: [
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
      ],
      nowList: [   "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"],
      index: 0,
    };
  }
 componentDidMount() {
    this.props.getCardAllRequest().catch(e=>console.log(e));
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.state.list.length
    ) {
      this.onPaginatedSearch();
    }
  }

  onPaginatedSearch(){
    if(this.state.index<this.state.list.length) {
      this.setState({
        nowList: this.state.nowList.concat(this.state.list[this.state.index++])
      })
    }
  }
  onClickWrite(){

  }

  render() {
    return (
      <Container className="cnt2">
        <Row>
        <Navigator/>
        </Row>
          <CardDeck className="card1">
            <Row>
        <Col sm={{size: 10, order: 2, offset: 1}} style={{}}>
          {this.state.nowList.map((listValue,index)=> {
            return (
            <Card className="card2" body outline color="#ffe4a8" key={index}>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
              </CardBody>
              <img width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />
              <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <CardDetailView/>
              </CardBody>
            </Card>)
          })}
          {/*<CardImg top width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />*/}
              </Col>
            </Row>
          </CardDeck>
      </Container>
    );
  }
}

export default MainPageView
