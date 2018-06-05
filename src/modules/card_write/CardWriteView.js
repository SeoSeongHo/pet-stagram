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
import Select from 'react-select'


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

class CardWriteView extends Component<Props, State> {
  constructor(props, context) {
    super(props, context);
    this.state = { pictures: [], pets:[], text:"", title:"",
    picturesURL:[],
    };
   // this.onDrop=this.onDrop.bind(this);
    autoBind(this)
  }
  componentWillMount(){
    this.props.getPetRequest(Storage.get(KEYS.userEmail)).catch(e=>{console.log(e)});
  }

  onDrop(event) {
    console.log("on Drop");
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
  render() {
    console.log(this.state.pictures,"pictures");
    console.log(this.state.picturesURL,"picturesURL");
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="exampleSelectMulti">Select Multiple Pets</Label>
            <Input onChange={this.selectPets} type="select" name="selectMulti" id="exampleSelectMulti" multiple>
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
          <Button onClick={() => this.onSubmitPressed()}>Let's post</Button>
        </Form>
        <input ref="file"
               type="file"
               name="user[image]"
               multiple="true"
               onChange={this.onDrop}/>
        {this.state.picturesURL.map((listValue,index)=>{
          return <div key={index} onClick={()=>this.deletePicture(index)}><img src={listValue} /></div>;
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
  {/* <ImageUploader
      withIcon={true}
      buttonText='Choose images'
      onChange={this.onDrop}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
      style={{ maxWidth: '500px', margin: "20px auto" }}
      withPreview={true}
      />*/}
