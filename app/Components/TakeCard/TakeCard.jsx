import React from 'react';
import Singleton from '../Utils/Singleton.js';
import { browserHistory } from 'react-router';
import Header from '../Header/Header.jsx';
import styles from './takeCard.less';
import setLoading from '../Utils/SetLoading.js';

export default class PinCode extends React.Component {

  constructor(props) {
    super(props);
    this.singleton = new Singleton();
    this.onCard = this.onCard.bind(this);
  }

  componentWillMount() {
    if (!this.singleton.cardInserted || !this.singleton.pinCorrect) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    setLoading(false);
  }

  onCard() {
    this.singleton.setCardInserted(false);
    this.singleton.setPinCorrect(false);
    browserHistory.push('/');
  }

  render() {
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
    );
  }
}
