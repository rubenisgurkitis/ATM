import React from 'react';
import Singleton from '../Utils/Singleton.js'
import Header from '../Header/Header.jsx';
import FocusedInput from '../FocusedInput/FocusedInput.jsx'
import Loading from '../Loading/Loading.jsx';
import setLoading from '../Utils/SetLoading.js';
import { browserHistory } from 'react-router';
import styles from './moneySelector.less';

export default class Money extends React.Component {

  constructor(props) {
    super(props);
    this.singleton = new Singleton();
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.state = {
      isAmount: false
    };
  }

  componentWillMount() {
    // If the user access without card and pin, go to first screen
    if (!this.singleton.cardInserted || !this.singleton.pinCorrect) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    // Animations give better fealing when removing loading class in the
    // new component
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  handleClick(event) {
    if (event.target.className === styles.quantity) {
      browserHistory.push('/takeCard');
    }
  }

  handleKey(event) {
    // Allow the user to only use numeric keys and enter
    if (event.nativeEvent.keyCode === 13){
      this.checkAmount(event.target.value);
    } else if (event.nativeEvent.keyCode < 48 || event.nativeEvent.keyCode > 57) {
      event.preventDefault();
    } else {
      this.setState({
        isAmount: true
      });
    }
  }

  handleBack(event) {
    // Makes no sense to go back to the enter pin screen, go to takeCard
    browserHistory.push('/takeCard');
  }

  handleClear() {
    document.getElementById('quantityInput').value = ''
    document.getElementById('quantityInputContainer').classList.remove('error');
    this.setState({
      isAmount: false
    });
  }

  handleAccept(event) {
    this.checkAmount(document.getElementById('quantityInput').value);
  }

  checkAmount(amount) {
      if (amount && amount % 10 === 0 && amount < 50000) {
        browserHistory.push('/takeCard');
      } else {
        setLoading(true);
        setTimeout(() => {
          // If there's an error, finish the loading screen and show the error label
          document.getElementById('quantityInputContainer').classList.add('error');
          setLoading(false);
        }, 2000);
      }
  }

  render() {
    return (
      <div>
        <Header />
        <Loading />
        <div className={styles.inputContainer}>
          <h2>Please, insert an amount (min. quantity is 10€)</h2>
          <FocusedInput id="quantityInput"
            type="number"
            name="Quantity"
            placeholder="€"
            autoComplete="off"
            handleKey={this.handleKey}
            errorMessage="Wrong amount"/>
            <div>
              <button
                className={styles.backButton}
                onClick={this.handleBack}>
                Cancel
              </button>
              <button
                className={styles.acceptButton}
                onClick={this.handleAccept}
                disabled={!this.state.isAmount}>
                Accept
              </button>
              <button
                className={styles.clearButton}
                onClick={this.handleClear}
                disabled={!this.state.isAmount}>
                Clear
              </button>
            </div>
        </div>
        <div className={styles.choices}
          onClick={this.handleClick}>
          <div className={styles.left}>
            <div className={styles.quantity}>10</div>
            <div className={styles.quantity}>20</div>
            <div className={styles.quantity}>50</div>
          </div>
          <div className={styles.right}>
            <div className={styles.quantity}>100</div>
            <div className={styles.quantity}>200</div>
            <div className={styles.quantity}>500</div>
          </div>
        </div>
      </div>
    );
  }
}
