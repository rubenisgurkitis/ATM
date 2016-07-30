import React from 'react';
import Singleton from '../Utils/Singleton.js'
import Header from '../Header/Header.jsx';
import FocusedInput from '../FocusedInput/FocusedInput.jsx'
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
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  }

  handleClick(event) {
    if (event.target.className === styles.quantity) {
      browserHistory.push('/takeCard');
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
    browserHistory.goBack();
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
    if (amount && amount % 10 === 0) {
      browserHistory.push('/takeCard');
    } else {
      document.getElementById('quantityInputContainer').classList.add('error');
    }
  }

  render() {
    if (this.state.loading) {
      return (<h1>Loading</h1>);
    } else {
      return (
        <div>
          <Header />
          <div className={styles.inputContainer}>
            <h2>Please, insert an ammount (min. quantity is 10€)</h2>
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
}
