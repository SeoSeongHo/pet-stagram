// @flow
import React, { Component } from 'react'
import autoBind from 'react-autobind'
import Calendar from 'react-calendar';
import Moment from 'react-moment';
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import _ from 'lodash'
// import easi6Theme from '../../utils/petStagramTheme'
// import petStagramLogo from '../../../assets/images/petStagramLogo.png';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardFooter, CardText, FormText, Alert, Container, Row, Col} from 'reactstrap';


type State = {
    Memo:[{
      created: Date,
      text: string,
    }]
};

type Props = {

};



class MemoView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { date: new Date(),
      Text:"",
      Memo:[]
    };
    autoBind(this)
  }
  componentWillMount(){
    this.props.getMemoRequest().catch((e)=>console.log(e));
  }
  componentWillReceiveProps(nextProps){
    this.props.getMemoRequest().catch((e)=>console.log(e));
  }
  onSubmitPressed() {
    this.props.postMemoRequest(this.state.date,this.state.Text).then(()=>this.setState({Text: ""})).catch((e)=>console.log(e));
  }
  onChange(date){
    this.setState({date},()=>console.log(this.state.date))
  }
  giveContent(date, view){
    var count=0;
    this.props.Memo.map((listValue,index)=> {
      var date2 = new Date(listValue.created);
      view === 'month' && date.getMonth()===date2.getMonth() && date.getDate()===date2.getDate() &&
      date.getYear()===date2.getYear() ? count++: null
    })
    return count===0 ? null: ( <p>일정 : {count}</p>)
  }
  showMemo(listValue,index){
    return(
    <div key={index}>
      <Moment format="YYYY/MM/DD">
        {listValue.date}
      </Moment>
      <p>{listValue.Text}</p>
    </div>
    )
  }
  render() {
    return(
    <div>
      <Calendar
        onChange={this.onChange}
        value={this.state.date}
        tileContent={({ date, view }) => this.giveContent(date,view)}
      />
    {
      _.filter(this.props.Memo,(listValue)=>{
        var date = new Date(listValue.created);
        return(
          this.state.date.getMonth()===date.getMonth() && this.state.date.getDate()===date.getDate() &&
          this.state.date.getYear()===date.getYear())
      }).map((listValue,index)=>{
        return(
         this.showMemo(listValue,index)
        )
    })
    }
      <Form  onClick={()=> this.onSubmitPressed()}>
        <FormGroup>
          <Label for="Text">Text Area</Label>
          <Input type="textarea" name="text" id="Text" value={this.state.Text} onChange={(e)=>this.setState({Text:e.target.value})}/>
        </FormGroup>
        <Button onClick={() => this.onSubmitPressed()}>Enter Memo</Button>
      </Form>
    </div>)
  }
}

export default MemoView
