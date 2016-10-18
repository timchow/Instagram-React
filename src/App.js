var ReactDOM = require('react-dom');
var React = require('react');
 
var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame');
var NewDialog = require('./Dialog.js');
 

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
	handleUserInput: function(a) {
		this.setState({
			searchText: a
		}, function() {
			$('#bar').trigger('search');
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

ReactDOM.render(
  <App />,
  document.getElementById('app')
);