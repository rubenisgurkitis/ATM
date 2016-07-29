import React from 'react';
import Singleton from '../Utils/Singleton.js'
import Header from '../Header/Header.jsx';
import FocusedInput from '../Utils/FocusedInput.jsx'
import { browserHistory } from 'react-router';

export default class Money extends React.Component {

  constructor(props) {
    super(props);
    this.singleton = new Singleton();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    if (!this.singleton.cardInserted || !this.singleton.pinCorrect) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  }

  handleClick(event) {
    if (event.target.nodeName === 'SPAN') {
      browserHistory.push('/takeCard');
    }
  }

  handleKey(event) {
    if (event.nativeEvent.keyCode === 13){
      if (event.target.value % 10 === 0) {
        browserHistory.push('/takeCard');
      }
    } else if (event.nativeEvent.keyCode < 48 || event.nativeEvent.keyCode > 57) {
      event.preventDefault();
    }
  }

  render() {
    if (this.state.loading) {
      return (<h1>Loading</h1>);
    } else {
      return (
        <div onClick={this.handleClick}>
          <div className="left">
            <span>10</span>
            <span>20</span>
            <span>50</span>
          </div>
          <div className="center">
            <FocusedInput id="QuantityInput"
              type="number"
              name="Quantity"
              placeholder=""
              autoComplete="off"
              handleKey={this.handleKey}/>
          </div>
          <div className="right">
            <span>100</span>
            <span>200</span>
            <span>500</span>
          </div>
        </div>
      );
    }
  }
}
