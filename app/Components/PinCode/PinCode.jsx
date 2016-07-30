import React from 'react';
import Singleton from '../Utils/Singleton.js'
import Header from '../Header/Header.jsx';
import Loading from '../Loading/Loading.jsx';
import setLoading from '../Utils/SetLoading.js';
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
    };
  }

  componentDidMount() {
    // Animations give better fealing when removing loading class in the
    // new component
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  componentWillMount() {
    // If the card is not inserted, get back to the first screen
    if (!this.singleton.cardInserted) {
      browserHistory.push('/');
    }
  }

  isPinCorrect() {
    let inputElement = document.getElementById('pinInput');
      // It doesn't use === to save a parseInt, since is a demo is save enough
      if (inputElement.value && inputElement.value == 1234) {
        this.singleton.setPinCorrect(true);
        browserHistory.push('/moneySelection');
      } else {
        // If there's an error, finish the loading screen and show the error label
        setLoading(true);
        setTimeout(() => {
          document.getElementById('pinInputContainer').classList.add('error');
          setLoading(false);
        }, 2000);
      }
  }

  handleKey(event) {
    // Allows the user to only use number keys and enter
    if (event.nativeEvent.keyCode === 13){
      this.isPinCorrect();
    } else if (event.nativeEvent.keyCode >= 48 && event.nativeEvent.keyCode <= 57 && event.target.value.length < 4) {
      // Used only to know if buttons should be enabled
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
    // Disables the buttons
    this.setState({
      pinCode: false
    });
  }

  handleAccept(event) {
    this.isPinCorrect();
  }

  handleBack(event) {
    // Previous screen would be to take the card
    browserHistory.push('/takeCard');
  }

  render() {
    return (
      <div>
        <Header />
        <Loading />
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
              Cancel
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
