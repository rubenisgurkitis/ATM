import React from 'react';
import Singleton from '../Utils/Singleton.js'
import Header from '../Header/Header.jsx';
import FocusedInput from '../FocusedInput/FocusedInput.jsx';
import { browserHistory } from 'react-router';
import styles from './pinCode.less';

export default class PinCode extends React.Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.singleton = new Singleton();
    this.state = {
      pinCode: false,
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

  isPinCorrect() {
    let inputElement = document.getElementById('pinInput');
    if (inputElement.value.length === 4 && inputElement.value == 1234) {
      this.singleton.setPinCorrect(true);
      browserHistory.push('/moneySelection');
    } else {
      document.getElementById('pinInputContainer').classList.add('error');
    }
  }

  handleKey(event) {
    if (event.nativeEvent.keyCode === 13){
      this.isPinCorrect();
    } else if (event.nativeEvent.keyCode >= 48 && event.nativeEvent.keyCode <= 57 && event.target.value.length < 4) {
      this.setState({
        pinCode: true
      });
    } else {
      event.preventDefault();
    }
  }

  handleClear(event) {
    document.getElementById('pinInput').value = '';
    document.getElementById('pinInputContainer').classList.remove('error');
    this.setState({
      pinCode: false
    });
  }

  handleAccept(event) {
    this.isPinCorrect();
  }

  handleBack(event) {
    browserHistory.goBack();
  }

  render() {
    if (this.state.loading) {
      return (<h1>Loading</h1>);
    } else {
      return (
        <div>
          <Header />
          <div className={styles.container}>
            <h2>Please, insert your pin code</h2>
            <FocusedInput id="pinInput"
              type="password"
              name="pinCode"
              placeholder="Pin"
              autoComplete="off"
              handleKey={this.handleKey}
              errorMessage="Wrong PIN code" />
            <div>
              <button
                className={styles.backButton}
                onClick={this.handleBack}>
                Back
              </button>
              <button
                className={styles.acceptButton}
                onClick={this.handleAccept}
                disabled={!this.state.pinCode}>
                Accept
              </button>
              <button
                className={styles.clearButton}
                onClick={this.handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
