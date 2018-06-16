import React, { Component } from 'react';
import { Container, Button,
Card, CardBody, CardTitle, CardText, CardSubtitle, Col, Row, Input, Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption} from 'reactstrap';
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
  cardId: any,
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
  },
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
    id: any,
  }],
  getCardRequest: Function,
  getCommentRequest: Function,
  deleteCardRequest: Function,
  deleteCommentRequest: Function,
  deleteLikeRequest: Function,
  postLikeRequest: Function,
  postCommentRequest: Function,
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

  constructor(props){
    super(props);
    this.state = {
      commentId:-1,
      pictures: [],
      comment: "",
      pets: [],
      text: "",
      title: "",
      picturesURL: [],
      modalIsOpen: false,
      activeIndex: 0,
    };
    autoBind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    this.props.getCardRequest(this.props.card_id)
      .catch(e=>{console.log(e)});
  }
  onClickComment(){
    this.props.postCommentRequest(this.props.card_id, this.state.comment).then(this.props.getCardRequest(this.props.card_id).catch(e=>console.log(e)))
      .catch(e=>console.log(e));
  }
  onClickEditCard(){
  }
  onClickLike(){
    if(_.includes(this.props.like,Storage.get(KEYS.userEmail)))
    {
      this.props.postLikeRequest(this.props.card_id).then(this.props.getCardRequest(this.props.card_id).catch(e=>console.log(e))).catch((e)=>console.log(e));
    } else
      this.props.deleteLikeRequest(this.props.card_id).then(this.props.getCardRequest(this.props.card_id).catch(e=>console.log(e))).catch((e)=>console.log(e));
  }
  onClickDeleteCard(){
    this.props.deleteCardRequest(this.props.card_id).then(()=>this.setState({modalIsOpen: false})).catch(e=>console.log(e))
  }
  onClickDeleteComment(commentId){
    this.props.deleteCommentRequest(commentId).then(this.props.getCardRequest(this.props.card_id).catch(e=>console.log(e))).catch(e=>console.log(e))
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
        { Storage.get(KEYS.userEmail)===this.props.owner.userEmail ?  (<div><button onClick={this.onClickDeleteCard}>delete</button> <button onClick={this.onClickEditCard}>edit</button></div>
        ) : null}
        {this.props.comments.map((listValue,index)=>{
          return <div key={index}>
            <span> {listValue.updated}</span>
            <span> {listValue.ownerName}</span>
            <span> {listValue.comment}</span>
            { listValue.ownerEmail===Storage.get(KEYS.userEmail) ? (<button onClick={()=>this.onClickDeleteComment(listValue.id)}>delete</button>) : null}
          </div>;
        })}
        <div onClick={()=>this.onClickLike()}>{this.props.like.includes(Storage.get(KEYS.userEmail)) ? <img width="100" height="100" src={require('../../assets/images/like.png')} /> :
          <img width="100" height="100" src={require('../../assets/images/like.png')} />}
          </div>
        <img width="100" height="100" src={require('../../assets/images/like.png')} />}
        <Input type="textarea" onChange={(e)=>this.setState({comment:e.target.value})} value={this.state.comment} />
        <button  onClick={()=>this.onClickComment()}>enter comment</button>
      </div>
    )
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const items = [
      {
        src: require('../../assets/images/logindog.jpg'),
        altText: '',
        caption: '',
      },
      {
        src: require('../../assets/images/logindog2.jpg'),
        altText: '',
        caption: '',
      },
      {
        src: require('../../assets/images/example.jpg'),
        altText: '',
        caption: '',
      },
    ];
    const slides = _.map(this.props.pictures,(item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item}
        >
          <img src={item} alt={item} width="500" height="500"/>
          <CarouselCaption captionText={item} captionHeader={item} />
        </CarouselItem>
      );
    });

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
          <Row>
          <Col sm={6}>
            <img width="30" height="30" src={require('../../assets/images/logindog2.jpg')} alt="Card image cap" />
            <span>  {_.get(this.props.pet,["pet_name"])} </span>
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              className="car1"
            >
                <CarouselIndicators items={this.props.pictures} activeIndex={activeIndex}
                                    onClickHandler={this.goToIndex}/>
              {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />

            </Carousel>
          </Col>
          <Col sm={6}>
            <img width="30" height="30" src={require('../../assets/images/user.png')} alt="Card image cap" />
            <span>  {this.props.owner}  </span>
            <Moment format="YYYY/MM/DD">
              {this.props.created}
            </Moment>
            <Button className="btt15" onClick={this.closeModal} color="white"><img width="15" height="15" src={require('../../assets/images/multiply.png')} alt="Card image cap" /></Button>
            <div>
              <span className="span1">  {this.props.text}  </span><br></br><br></br>
              <span> 저번에 같이 왔을 때는 신나게 놀던데 너무 뛰어 놀았는지 오늘은 얌전하네요</span><br></br>
              <span> 끝나고 소세지 먹으러 가야겠어요</span>
            </div>
            <div className="img1">
          <img width="30" height="30" src={require('../../assets/images/like1.png') }/>
          <img className="img2" width="30" height="30" src={require('../../assets/images/comment-white-oval-bubble.png') }/>
            </div>
          <Input type="textarea" onChange={(e)=>this.setState({comment:e.target.value})} value={this.state.comment} />
            <Row className="row1">
              <Col>
              <Button onClick={()=>this.onClickComment()}>ENTER COMMENT</Button>
              </Col>
            </Row>
              <Row className="row2">
              <Col>
            <CardWriteView/>
              </Col>
            </Row>
          </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
export default CardDetailView;
