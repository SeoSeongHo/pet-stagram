// @flow
import React, { Component } from 'react'
import { Input, Alert, Button, Container, Row, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import example from '../../assets/images/example.jpg';
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

class CardView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this)
  }

  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={require('../../assets/images/example1.png')} alt="Card image cap" />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CardView
