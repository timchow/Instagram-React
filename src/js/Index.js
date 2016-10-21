var ReactDOM = require('react-dom');
var React = require('react');
 
var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame');
var NewDialog = require('./Dialog.js');
var InsightsView = require('./Insights.js');
var UserView = require('./UserView.js')

var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var Route = require('react-router').Route;

import UserBox from './UserBox'

var SearchView = React.createClass({
	render: function() {
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
});

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={SearchView} />
		<Route path="/user/:user_name" component={UserView} />
		<Route path="/user/:user_name/insights" component={InsightsView} />
	</Router>
), document.getElementById('app'));