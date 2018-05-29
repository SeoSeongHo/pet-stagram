// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import Navigator from '../top_navigator/navigator'

type State = {
  username: string,
  password: string,
  secure: boolean,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};
// class CardView extends Component<Props, State> {
//   constructor(props) {
//     super(props);
//     this.state = { activeIndex: 0 };
//     this.next = this.next.bind(this);
//     this.previous = this.previous.bind(this);
//     this.goToIndex = this.goToIndex.bind(this);
//     this.onExiting = this.onExiting.bind(this);
//     this.onExited = this.onExited.bind(this);
//   }
//
//   onExiting() {
//     this.animating = true;
//   }
//
//   onExited() {
//     this.animating = false;
//   }
//
//   next() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
//     this.setState({ activeIndex: nextIndex });
//   }
//
//   previous() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
//     this.setState({ activeIndex: nextIndex });
//   }
//
//   goToIndex(newIndex) {
//     if (this.animating) return;
//     this.setState({ activeIndex: newIndex });
//   }
//
//   render() {
//     const { activeIndex } = this.state;
//
//     const slides = items.map((item) => {
//       return (
//         <CarouselItem
//           onExiting={this.onExiting}
//           onExited={this.onExited}
//           key={item.src}
//         >
//           <img src={item.src} alt={item.altText} />
//           <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
//         </CarouselItem>
//       );
//     });
//
//     return (
//       <div>
//         <Navigator/>
//       <Carousel
//         activeIndex={activeIndex}
//         next={this.next}
//         previous={this.previous}
//       >
//         <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
//         {slides}
//         <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
//         <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
//       </Carousel>
//       </div>
//     );
//   }
// }

class CardView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this)
  }

  render() {
    return (
      <Container>
        <Row>
        <Navigator/>
        </Row>
        <Row>
          <CardDeck className="card1">
        <Col sm={{size: 9, order: 2, offset: 4}} style={{}}>
          {/*<CardImg top width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />*/}
          <Card className="card2" body outline color="secondary">
            <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            </CardBody>
            <img width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />
            <CardBody>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
            </CardBody>
          </Card>
          <Card className="card2" body outline color="secondary">
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
            </CardBody>
            <img width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />
            <CardBody>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card className="card2" body outline color="secondary">
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
            </CardBody>
            <img width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />
            <CardBody>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Col>
          </CardDeck>
        </Row>
      </Container>
    );
  }
}

export default CardView
