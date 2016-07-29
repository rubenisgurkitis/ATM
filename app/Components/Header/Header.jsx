import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <img src="app/assets/N26Logo.svg"></img>
        <h4>Banking by design</h4>
      </header>
    );
  }
}
