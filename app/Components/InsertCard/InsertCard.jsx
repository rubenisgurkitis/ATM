import React from 'react';
import Header from '../Header/Header.jsx';
import Singleton from '../Utils/Singleton.js'
import { browserHistory } from 'react-router';

export default class InsertCard extends React.Component {
  constructor(props) {
    super(props);
    this.singleton = new Singleton();
    this.onCard = this.onCard.bind(this);
  }

  onCard() {
    this.singleton.setCardInserted(true);
    browserHistory.push('/pinCode');
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <h2>Please, insert your card</h2>
          <button onClick={this.onCard}>Insert card</button>
        </div>
      </div>
    );
  }
}