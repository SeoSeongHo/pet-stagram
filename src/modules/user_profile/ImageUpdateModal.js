import React, { Component } from 'react'
import autoBind from 'react-autobind'
import Modal from "react-modal";
import {Button, Row, Col, Card, CardBody, CardText, CardFooter, Form, FormGroup, FormText, Input, Label} from 'reactstrap'
import './UserProfile.css'
import _ from "lodash";

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

class ImageUpdateModal extends Component{
  constructor(props){
    super(props);
    autoBind(this);

    this.state = {
    }
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

  onUpdatePressed(){

  }

  onChangePetName(){

  }

  onChangePetBirthday(){

  }

  render(){
    return (
      <div>
        <Button className="btt15" onClick={this.openModal}>펫 추가</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Col>
            <Form>
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label for="Title">PetName</Label>
                    <Input type="title" name="title" id="Title" onChange={this.onChangePetName} placeholder="write PetName" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleDate">PetBirthday</Label>
                      <Input type="date" name="date" className="signUpDate" placeholder="write down your pet's birthday" onChange={this.onChangePetBirthday}/>
                  </FormGroup>
                  <Label for="exampleFile">PetImage</Label>
                  <Row>
                  <input ref="file"
                         type="file"
                         name="user[image]"
                         multiple="true"
                         className="ImgInp1"/>
                  <span>
                    최대 3장
                  </span>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.onUpdatePressed}>Update</Button>
                  <Button className="btt20" onClick={this.closeModal}>Cancel</Button>                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Modal>
      </div>
    )
  }
}

export default ImageUpdateModal;
