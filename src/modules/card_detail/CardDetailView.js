import React, { Component } from 'react';
import { Container, Button, Modal, ModalHeader, ModalFooter, ModalBody,
Card, CardBody, CardTitle, CardText, CardSubtitle,} from 'reactstrap';
import ReactDom from 'react-dom';


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


class CardDetailView extends Component<Props, State> {

  constructor(props, context){
    super(props, context);
    this.state = {
      pictures: [],
      pets: [],
      text: "",
      title: "",
      picturesURL: [],
      modal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({modal: !this.state.modal});
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal}>modal</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
          <ModalHeader toggle={this.toggleModal}>카드정보</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>Do something</Button>
            <Button color="primary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CardDetailView;
