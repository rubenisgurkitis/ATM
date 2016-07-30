import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';

import InsertCard from './Components/InsertCard/InsertCard.jsx';
import PinCode from './Components/PinCode/PinCode.jsx';
import Money from './Components/MoneySelector/MoneySelector.jsx';
import TakeCard from './Components/TakeCard/TakeCard.jsx';

import styles from './main.less';

class App extends React.Component {
	render () {
		return (
			<Router history={browserHistory}>
        <Route path="/" component={InsertCard} />
        <Route path="/pinCode" component={PinCode} />
        <Route path='/moneySelection' component={Money} />
        <Route path='/takeCard' component={TakeCard} />
      </Router>
		);
	}
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));
