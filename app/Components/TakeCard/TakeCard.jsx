import React from 'react';
import Singleton from '../Utils/Singleton.js'
import { browserHistory } from 'react-router';
import Header from '../Header/Header.jsx';
import styles from './takeCard.less'

export default class PinCode extends React.Component {

  constructor(props) {
    super(props);
    this.singleton = new Singleton();
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
      this.setState({loading: false});
    }, 1000);
  }

  onCard() {
    browserHistory.push('/');
  }

  render() {
    if (this.state.loading) {
      return (
        <h1>Loading</h1>
      );
    } else {
      return (
        <div>
          <Header />
          <div className={styles.container}>
            <h2>Please, take your card and money</h2>
            <div>
              <button className={styles.button} onClick={this.onCard}>Take card</button>
            </div>
          </div>
        </div>
      )
    }
  }
}
