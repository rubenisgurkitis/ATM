import React from 'react';
import Singleton from '../Utils/Singleton.js';
import { browserHistory } from 'react-router';
import Header from '../Header/Header.jsx';
import styles from './takeCard.less';
import setLoading from '../Utils/SetLoading.js';
import Loading from '../Loading/Loading.jsx';

export default class PinCode extends React.Component {

  constructor(props) {
    super(props);
    this.singleton = new Singleton();
    this.onCard = this.onCard.bind(this);
  }

  componentWillMount() {
    // If the user access without card, go to first screen
    if (!this.singleton.cardInserted) {
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

  onCard() {
    // Card is removed, so no correct pin or card inserted
    this.singleton.setCardInserted(false);
    this.singleton.setPinCorrect(false);
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <Loading />
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
