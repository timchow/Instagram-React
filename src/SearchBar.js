var React = require('react');
//import {React} from "react"
var OF = require('office-ui-fabric-react');

var SearchBox = OF.SearchBox;
var Button = OF.Button;
var ButtonType = OF.ButtonType;

var SearchBarStyle = {
	width: '300px',
	zIndex: '0'
};

var SearchBar = React.createClass({
	getInitialState: function () {
		return {
			text: ''
		};
	},
	updateInput: function(ev) {
		this.setState({
			text: ev
		});
	},
	render: function() {

		return (
			<form id="bar" style={SearchBarStyle} action={`/user/${this.state.text}`} method='GET'>
				<SearchBox type="text" onChange={this.updateInput} value={this.state.text} ref="searchText" labelText="Search Username" />
			</form>
			);
	}
});

/*
class SearchBar extends React.Component {
	state = {
		text: ''
	}
}*/

module.exports = SearchBar;