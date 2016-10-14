var ReactDOM = require('react-dom');
var React = require('react');
 
var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame')
 

var App = React.createClass({
	getInitialState: function() {
		return {
			searchText: ''
		};
	},
	handleUserInput: function(a) {
		this.setState({
			searchText: a
		}, function() {
			$('#bar').trigger('search');
		});
	},
	render: function() {
		return (
			<div>
				<SearchBar 
					searchText={this.state.searchText}
					onUserInput={this.handleUserInput}
				/>
				<PhotoFrame 
					searchText={this.state.searchText}
				/>
			</div>
		);
	}
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);