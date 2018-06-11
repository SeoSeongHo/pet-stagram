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
import './memoView.css'

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
  onSubmitPressed(e) {
    e.preventDefault();
    this.props.postMemoRequest(this.state.date,this.state.Text).then(()=>{this.setState({Text: ""}
    )
        this.props.getMemoRequest().catch((e)=>console.log(e));
    }
    ).catch((e)=>console.log(e));
  }
  onChange(date){
    this.setState({date},()=>console.log(this.state.date))
  }
  giveContent(date, view){
    var count=0;
    this.props.Memo.map((listValue,index)=> {
      var date2 = new Date(listValue.date);
      view === 'month' && date.getMonth()===date2.getMonth() && date.getDate()===date2.getDate() &&
      date.getYear()===date2.getYear() ? count++: null
    })
    return count===0 ? null: ( <p>일정 : {count}</p>)
  }
  showMemo(listValue,index){
    return(
    <div key={index}>
      <Moment format=" h시MM분 ">
        {listValue.date}
      </Moment>
      <p>{listValue.text}</p>
    <hr/>
    </div>
    )
  }
  render() {
    return(
    <div style={{display:"inline-block"}} className="memo1">
      <Calendar
        onChange={this.onChange}
        value={this.state.date}
        // tileContent={({ date, view }) => this.giveContent(date,view)}
      />
    {
      _.filter(this.props.Memo,(listValue)=>{
        var date = new Date(listValue.date);
        return(
          this.state.date.getMonth()===date.getMonth() && this.state.date.getDate()===date.getDate() &&
          this.state.date.getYear()===date.getYear())
      }).map((listValue,index)=>{
        return(
         this.showMemo(listValue,index)
        )
    })
    }
      <Form  onSubmit={(e)=>this.onSubmitPressed(e)}>
        <FormGroup>
          <br/>
          <Input placeholder="write memo" type="textarea" name="text" id="Text" value={this.state.Text} onChange={(e)=>this.setState({Text:e.target.value})}/>
        </FormGroup>
        <Button type="submit">Enter Memo</Button>
      </Form>
    </div>)
  }
}

export default MemoView
