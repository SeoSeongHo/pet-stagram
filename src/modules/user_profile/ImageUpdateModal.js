import React, { Component } from 'react'
import autoBind from 'react-autobind'
import Modal from "react-modal";
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
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
  onDrop(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        petProfileImage: file,
        petProfileImageUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  onUpdatePressed(){
      this.props.postPetRequest(this.state.petName,this.state.petProfileImage,this.state.petBirthDay,this.state.introduceText,Storage.get(KEYS.userEmail)).then(()=>
      this.props.getUserProfileRequest(Storage.get(KEYS.userEmail)).then(()=>this.closeModal()).catch((e)=>console.log(e)))
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
                    <Input type="title" name="title" id="Title" onChange={(e)=>this.setState({petName: e.target.value})} placeholder="write PetName" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleDate">PetBirthday</Label>
                      <Input type="date" name="date" className="signUpDate" placeholder="write down your pet's birthday" onChange={(e)=>this.setState({petBirthDay:e.target.value})}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleDate">Pet Introduce</Label>
                    <Input type="title" name="title" id="Title" placeholder="write down your pet's introduce" onChange={(e)=>this.setState({introduceText:e.target.value})}/>
                  </FormGroup>
                  <Label for="exampleFile">PetImage</Label>
                  <Row>
                      <Input type="file" name="file" id="exampleFile2"  ref="user" className="userProfileImage" onChange={(e)=>this.onDrop(e)}/>
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
