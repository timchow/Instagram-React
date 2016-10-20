var React = require('react');
var OF = require('office-ui-fabric-react');

var SearchBox = OF.SearchBox;
var Button = OF.Button;
var ButtonType = OF.ButtonType;

SearchBarStyle = {
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
	handle: function(nextState, replace) {
		console.log(1)
		replace("/user/"+this.state.text);
	},
	render: function() {
		var url = "/user/"+this.state.text;
		return (
			<form id="bar" style={SearchBarStyle} action={url} method='GET'>
				<SearchBox type="text" onChange={this.updateInput} value={this.state.text} ref="searchText" labelText="Search Username" />
			</form>
			);
	}
});

module.exports = SearchBar;