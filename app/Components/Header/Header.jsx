import React from 'react';
import style from './header.less';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className={style.header}>
        <img className={style.img} src="app/assets/number26_2x.png"></img>
        <div className={style.subtitleContainer}>
          <h4>Banking by design</h4>
        </div>
      </header>
    );
  }
}
