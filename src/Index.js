var ReactDOM = require('react-dom');
var React = require('react');
//var Router = require('react-router');
 
var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame');
var NewDialog = require('./Dialog.js');

var Router = require('react-router').Router
var Route = require('react-router').Route

var App = React.createClass({
	getInitialState: function() {
		return {
			searchText: '',
			showDialog: false
		};
	},
	componentDidMount: function() {
		var that = this;
		$(window).on('photoClicked', function() {
			that.setState({
				showDialog: true
			});
		});
	},
	handleUserInput: function(user_name) {
		this.setState({
			searchText: user_name
		}, function() {
			$('#bar').trigger('search');
			//window.location.href = "/user/"+user_name;
		});
	},
	_showDialog: function() {
		this.setState( {showDialog: true } );
	},
	_closeDialog: function() {
		this.setState( {showDialog: false } );
	},
	render: function() {
		return (
			<div>
				<SearchBar 
					searchText={this.state.searchText}
					onUserInput={this.handleUserInput}
				/>
				<PhotoFrame 
					id='frame'
					searchText={this.state.searchText}
				/>
				<NewDialog 
					showDialog={this._showDialog} 
					closeDialog={this._closeDialog}
					dialogState={this.state.showDialog}
				/>
			</div>
		);
	}
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App} />
    <Route path="/users" component={App} />
  </Router>
), document.getElementById('app'));