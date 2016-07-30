import React from 'react';
import Header from '../Header/Header.jsx';
import Singleton from '../Utils/Singleton.js';
import Loading from '../Loading/Loading.jsx';
import { browserHistory } from 'react-router';
import style from './insertCard.less';
import setLoading from '../Utils/SetLoading.js';

export default class InsertCard extends React.Component {
  constructor(props) {
    super(props);
    this.singleton = new Singleton();
    this.onCard = this.onCard.bind(this);
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
    this.singleton.setCardInserted(true);
    //setLoading(true);
    //setTimeout(() => {
      browserHistory.push('/pinCode');
    //}, 2000);
  }

  render() {
    return (
      <div>
        <Header />
        <Loading />
        <div className={style.container}>
          <h2>Please, insert your card</h2>
          <div>
            <button className={style.button} onClick={this.onCard}>Insert card</button>
          </div>
        </div>
      </div>
    );
  }
}
