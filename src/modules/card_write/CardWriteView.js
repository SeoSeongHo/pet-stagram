// @flow
import React, { Component } from 'react'
import autoBind from 'react-autobind'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import _ from 'lodash'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';
import ImageUploader from 'react-images-upload';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardFooter, CardText, FormText, Alert, Container, Row, Col} from 'reactstrap';
import Select from 'react-select'
import Modal from "react-modal";
import './CardWriteView.css'


type State = {
  pictures: Array,
  pets:Array,
  picturesURL: Array,
  text:string,
  title:string,
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

class CardWriteView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { pictures: [], pets:[], text:"", title:"",
    picturesURL:[],
    };
   // this.onDrop=this.onDrop.bind(this);
    autoBind(this)
  }
  componentWillMount(){
    //this.props.getPetRequest(Storage.get(KEYS.userEmail)).catch(e=>{console.log(e)});
  }

  onDrop(event) {
    console.log("on Drop");
    if(this.state.pictures.length>2){
      return null;
    }
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
        pictures: this.state.pictures.concat(file),
        picturesURL: this.state.picturesURL.concat(reader.result),
      });
    }.bind(this);
    console.log(url) // Would see a path
  }

  selectPets(event){
      this.setState({pets: [...event.target.selectedOptions].map(o => o.value)});
  }
  onSubmitPressed(){
    console.log("press submit");
    this.props.postCardRequest(this.state.pets,this.state.pictures,this.state.title,this.state.text).catch((e)=>console.log(e))
  }
  titleChange(e){
    console.log("titleChange",e.target.value);
    this.setState({title: e.target.value})
  }
  textChange(e){
    this.setState({text: e.target.value})
  }
  getIndex(value, arr) {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  deletePicture(index){
   // let index = this.getIndex(e.target.src, this.state.picturesURL);
    // remove the todo with the ID of id, but only if we have it to begin with
    console.log("deletePicture",index);
    var array = [...this.state.pictures]; // make a separate copy of the array
    array.splice(index, 1);
    var array2= [...this.state.picturesURL];
    array2.splice(index,1);
    this.setState({pictures: array,picturesURL:array2});
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
    console.log(this.state.pictures,"pictures");
    console.log(this.state.picturesURL,"picturesURL");
    return (
      <div className="di1">
        <Button onClick={this.openModal} className="btt1" color="white"><img width="27" height="27" src={require('../../assets/images/edit.png')} alt="Card image cap" /></Button>
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
                {this.state.picturesURL.map((listValue,index)=>{
                  return <div key={index} onClick={()=>this.deletePicture(index)}><img width="100" height="100" src={listValue} /></div>;
                })}
                <CardBody>
                  <FormGroup>
                    <Label for="exampleSelect">Select Pets</Label>
                    <Input onChange={this.selectPets} type="select" name="select" id="exampleSelect">
                      {this.props.pets.map((listValue,index)=> {
                        return <option value={listValue.petId} key={index}>{listValue.petName}</option>;
                      })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="title" name="title" id="Title" onChange={this.titleChange} placeholder="with a placeholder" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleText">Text Area</Label>
                    <Input type="textarea" onChange={this.textChange} name="text" id="exampleText" />
                  </FormGroup>
                  <input ref="file"
                         type="file"
                         name="user[image]"
                         multiple="true"
                         onChange={this.onDrop}/>
                  <span>
                    최대 3장
                  </span>
                </CardBody>
                <CardFooter>
                  <Button className="btt2" color="#ffe4a8" onClick={() => this.onSubmitPressed()}>Let's post</Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Modal>
      </div>
    );
  }
}

export default CardWriteView
  {/* <ImageUploader
      withIcon={true}
      buttonText='Choose images'
      onChange={this.onDrop}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
      style={{ maxWidth: '500px', margin: "20px auto" }}
      withPreview={true}
      />*/}
