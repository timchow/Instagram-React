import ReactDOM from 'react-dom';
import React from 'react';
import {Router, browserHistory, Route} from 'react-router';

import SearchBar from './SearchBar';
import InsightsView from './InsightsView'
import UserView from './UserView';

class SearchView extends React.Component {
	render() {
		var indexStyle = this.props.indexStyle || {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)'
		};

		return (
			<div style={indexStyle}>
				<SearchBar label="Search Username" />
			</div>
		);
	}
};

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={SearchView} />
		<Route path="/user/:user_name" component={UserView} />
		<Route path="/user/:user_name/insights" component={InsightsView} />
	</Router>
), document.getElementById('app'));