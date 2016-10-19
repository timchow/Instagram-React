var ReactDOM = require('react-dom');
var React = require('react');
//var Router = require('react-router');
 
var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame');
var NewDialog = require('./Dialog.js');

var Router = require('react-router').Router
var Route = require('react-router').Route

var Search = React.createClass({
	render: function() {
		return (
			<div>
				<SearchBar />
			</div>
		);
	}
});

var Frame = React.createClass({
	getInitialState: function() {
		return {
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
	_showDialog: function() {
		this.setState( {showDialog: true } );
	},
	_closeDialog: function() {
		this.setState( {showDialog: false } );
	},
	render: function() {
		return (
			<div>
				<PhotoFrame
					user_name={this.props.routeParams.user_name}
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
    <Route path="/" component={Search} />
    <Route path="user/:user_name" component={Frame} />
  </Router>
), document.getElementById('app'));