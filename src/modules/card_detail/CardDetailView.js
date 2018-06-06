import React, { Component } from 'react';
import { Container, Button,
Card, CardBody, CardTitle, CardText, CardSubtitle, Col, Row,} from 'reactstrap';
import ReactDom from 'react-dom';
import Modal from 'react-modal';
import CardWriteView from '../card_write/CardWriteViewContainer'
import './CardDetailView.css'
import autoBind from 'react-autobind'
import Storage, {KEYS} from "../../utils/petStagramStorage";
import moment from 'moment';
import Moment from 'react-moment';
type State = {
  pictures: any,
  pets: Array,
  text: string,
  title: string,
  commentId: number,
};

type Props = {
  pet: any,
  pet:{
    petName: string,
    id: number,
    petProfileImage: any,
    petBirthDay: Date,
    petProperty: string,
  },
  owner: any,
  owner:{
    userProfileImage: string,
    userEmail: string,
    introduceText: string,
    username: string,
  }
  title: string,
  pictures: any,
  text: string,
  like : any,     //list of userEmail who like this card
  created: any,
  comments: any,
  comments:[{
    ownerName: string,
    ownerEmail: string,
    updated: any,
    comment: string,
  }],
  getCardRequest: Function,
  getCommentRequest: Function,
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
      commentId:-1,
      pictures: [],
      comment: "",
      pets: [],
      text: "",
      title: "",
      picturesURL: [],
      modalIsOpen: false
    };
    autoBind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    this.props.getCardRequest(this.context.match.url.id).then(()=>this.props.getCommentRequest(this.context.match.url.id).catch(e=>console.log(e)))
      .catch(e=>{console.log(e)});

  }
  onClickComment(){
    this.props.postCommentRequest(this.context.match.url.id, this.state.comment).then(this.props.getCommentRequest(this.context.match.url.id).catch(e=>console.log(e)))
      .catch(e=>console.log(e));
  }
  onClickEdit(){

  }
  onClickLike(){
    if(this.props.like.includes(Storage.get(KEYS.userEmail))) {
      this.props.postLikeRequest(this.context.match.url.id, Storage.get(KEYS.userEmail)).catch((e)=>console.log(e));
    } else
      this.props.deleteLikeRequest(this.context.match.url.id, Storage.get(KEYS.userEmail)).catch((e)=>console.log(e));
  }
  onClickDeleteCard(){
    this.props.deleteCardRequest(this.context.match.url.id);
  }
  onClickDeleteComment(){
    this.props.deleteCommentRequest(this.context.match.url.id, this.state.commentId);
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
  renderDetail(){
    return (
      <div> <span>{this.props.pet.petName}</span>
      <img src={this.props.pet.petProfileImage}/>
        <img src={this.props.owner.userProfileImage}/>
        <Moment format="YYYY/MM/DD">
          {this.props.created}
        </Moment>
        { Storage.get(KEYS.userEmail)===this.props.owner.userEmail ?  (<button onClick={this.onClickDeleteCard}>delete</button>) : null}
        {this.props.comments.map((listValue,index)=>{
          return <div key={index}>
            <span> {listValue.updated}</span>
            <span> {listValue.ownerName}</span>
            <span> {listValue.comment}</span>
            { listValue.ownerEmail===Storage.get(KEYS.userEmail) ? (<button onClick={this.onClickDeleteComment}>delete</button>) : null}
          </div>;
        })}
        <div onClick={()=>this.onClickLike()}>{this.props.like.includes(Storage.get(KEYS.userEmail)) ? <img width="100" height="100" src={require('../../assets/images/like.png')} /> :
          <img width="100" height="100" src={require('../../assets/images/like.png')} />}
          </div>
        <img width="100" height="100" src={require('../../assets/images/like.png')} />}
      </div>
    )
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
CardDetailView.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
  match: React.PropTypes.object
};
export default CardDetailView;
