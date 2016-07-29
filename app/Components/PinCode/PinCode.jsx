import React from 'react';
import Singleton from '../Utils/Singleton.js'
import Header from '../Header/Header.jsx';
import FocusedInput from '../Utils/FocusedInput.jsx';
import { browserHistory } from 'react-router';

export default class PinCode extends React.Component {

  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.singleton = new Singleton();
    this.state = {
      pinCode: null,
      loading: true
    };
  }

  componentWillMount() {
    if (!this.singleton.cardInserted) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 1000);
  }

  onPinCorrect() {
    this.singleton.setPinCorrect(true);
    browserHistory.push('/moneySelection');
  }

  handleKey(event) {
    if (event.nativeEvent.keyCode === 13 && event.target.value == 1234){
      this.onPinCorrect();
    } else if (event.nativeEvent.keyCode >= 48 && event.nativeEvent.keyCode <= 57 && event.target.value.length < 4) {
      this.setState({
        pinCode: this.state.pinCode ? this.state.pinCode + event.nativeEvent.key : event.nativeEvent.key
      });
    } else {
      event.preventDefault();
    }
  }

  handleClear(event) {
    document.getElementById('pinInput').value = '';
  }

  handleAccept(event) {
    if (document.getElementById('pinInput').value == 1234){
      this.onPinCorrect();
    }
  }

  render() {
    if (this.state.loading) {
      return (<h1>Loading</h1>);
    } else {
      return (
        <div>
          <Header />
          <div>
            <h2>Please, insert your pin code</h2>
            <FocusedInput id="pinInput"
              type="password"
              name="pinCode"
              placeholder="Pin"
              autoComplete="off"
              handleKey={this.handleKey} />
            <div>
              <button
                onClick={this.handleClear}>
                Clear
              </button>
              <button
                onClick={this.handleAccept}
                disabled={!this.state.pinCode}>
                Accept
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
