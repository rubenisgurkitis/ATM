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
      loading: true,
      isAmount: false
    };
  }

  componentWillMount() {
    if (!this.singleton.cardInserted || !this.singleton.pinCorrect) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    setLoading(false);
  }

  handleClick(event) {
    if (event.target.className === styles.quantity) {
      setLoading(true);
      setTimeout(() => {
        //setLoading(false);
        browserHistory.push('/takeCard');
      }, 2000);
    }
  }

  handleKey(event) {
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
    setLoading(true);
    setTimeout(() => {
      this.singleton.pinCorrect(false);
      //setLoading(false);
      browserHistory.goBack();
    }, 1000);
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
    setLoading(true);
    setTimeout(() => {
      if (amount && amount % 10 === 0 && amount < 50000) {
        browserHistory.push('/takeCard');
      } else {
        document.getElementById('quantityInputContainer').classList.add('error');
        setLoading(false);
      }
      //setLoading(false);
    }, 2000);
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
                Back
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
