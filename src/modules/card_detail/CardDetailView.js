import React, { Component } from 'react';
import { Container, Button,
Card, CardBody, CardTitle, CardText, CardSubtitle, Col, Row,} from 'reactstrap';
import ReactDom from 'react-dom';
import Modal from 'react-modal';
import CardWriteView from '../card_write/CardWriteViewContainer'
import './CardDetailView.css'

type State = {
  pictures: any,
  pets: Array,
  text: string,
  title: string,
};

type Props = {
  pets: Array,
  pets:{
    petName: string,
    petId: number,
    petImages: any,
    petBirthDay: Date,
    petProperty: string,
  }
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class CardDetailView extends Component<Props, State> {

  constructor(props, context){
    super(props, context);
    this.state = {
      pictures: [],
      pets: [],
      text: "",
      title: "",
      picturesURL: [],
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render() {
    return (
      <div className="di1">
        <Button onClick={this.openModal}>Detail</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Col sm={6}>
          <Card>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
            </CardBody>
            <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            </CardBody>
          </Card>
          </Col>
          <Col sm={6}>
            <CardWriteView/>
          </Col>
        </Modal>
      </div>
    );
  }
}

export default CardDetailView;
