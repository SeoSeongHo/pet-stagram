import React, { Component } from 'react'
import autoBind from 'react-autobind'
import Modal from "react-modal";
import {Button, Row, Col, Card, CardBody, CardText, CardFooter, Form} from 'reactstrap'
import './UserProfile.css'

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

  render(){
    return (
      <div>
        <Button className="btt15" color="white" onClick={this.openModal}><img width="15" height="15" src={require('../../assets/images/add.png')} alt="Card image cap" /></Button>
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
                  <input ref="file"
                         type="file"
                         name="user[image]"
                         multiple="true"/>
                  <span>
                    최대 3장
                  </span>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.onUpdatePressed}>Update</Button>
                  <Button className="btt20" onClick={this.closeModal}>Cancel</Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Modal>
      </div>
    )
  }
}

export default ImageUpdateModal;
