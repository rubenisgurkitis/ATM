import React from 'react';
import styles from './loading.less';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="loading" className={styles.loadingContainer}>
        <h2>Loading...</h2>
      </div>
    )
  }
}
