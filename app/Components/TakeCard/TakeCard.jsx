import React from 'react';
import Singleton from '../Utils/Singleton.js'
import { browserHistory } from 'react-router';

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

  render() {
    if (this.state.loading) {
      return (
        <h1>Loading</h1>
      );
    } else {
      return (
        <div>Take Card</div>
      )
    }
  }
}
