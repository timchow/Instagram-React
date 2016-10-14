var ReactDOM = require('react-dom');
var React = require('react');
 
var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame')
 

var App = React.createClass({
	render: function() {
		return (
			<div>
			<SearchBar searchText="text" />
			<PhotoFrame />
			</div>
			);
	}
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);