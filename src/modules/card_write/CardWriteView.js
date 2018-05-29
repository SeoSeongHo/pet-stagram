// @flow
import React, { Component } from 'react'
import autoBind from 'react-autobind'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import _ from 'lodash'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';
import ImageUploader from 'react-images-upload';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container, Row, Col} from 'reactstrap';
type State = {
  pictures: any,
  pets:Array,
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

class CardWriteView extends Component<Props, State> {
  constructor(props, context) {
    super(props, context);
    this.state = {pictures: [], pets:[], text:"", title:"",
    picturesURL:[],
    };
    autoBind(this)
  }

  onDrop(picture, pictureDataURL) {
    console.log("on Drop");
    this.setState({
      pictures: this.state.pictures.concat(picture),
      picturesURL: this.state.picturesURL.concat(pictureDataURL)
    });
  }
  selectPets(event){
      this.setState({pets: [...event.target.selectedOptions].map(o => o.value)});
  }
  onSubmitPressed(){
    this.props.postCardRequest(this.state.pets,this.state.pictures,this.state.title,this.state.text)
  }
  titleChange(e){
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
  deletePicture(e){
    let index = this.getIndex(e.target.src, this.state.picturesURL);
    // remove the todo with the ID of id, but only if we have it to begin with
    this.state.picturesURL = index > -1 ?
      this.state.picturesURL.remove(index) :
      this.state.picturesURL;
  }
  render() {
    return (
      <div>
      <Form>
        <FormGroup>
          <Label for="exampleSelectMulti">Select Multiple Pets</Label>
          <Input onChange={this.selectPets} type="select" name="selectMulti" id="exampleSelectMulti" multiple>
              {this.props.pets.map(function(listValue,index){
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
        <Button onClick={() => this.onSubmitPressed()}>Let's post</Button>
      </Form>
    <ImageUploader
      withIcon={true}
      buttonText='Choose images'
      onChange={this.onDrop}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
      id="fileUploader"
    />
    {this.state.picturesURL.map(function(listValue,index){
      return <div key={index}>
        <Img src={listValue} onClick={(e)=>this.deletePicture(e)}/>
      </div>
    })}
    </div>
    );
  }
}

CardWriteView.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
  match: React.PropTypes.object
};
export default CardWriteView
