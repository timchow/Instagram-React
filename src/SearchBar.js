var React = require('react');
var OF = require('office-ui-fabric-react');

var SearchBox = OF.SearchBox;
var Button = OF.Button;
var ButtonType = OF.ButtonType;

SearchBarStyle = {
	width: '300px'
};

var SearchBar = React.createClass({
	getInitialState: function () {
		return {
			text: ''
		};
	},
	handle: function(ev) {
		ev.preventDefault();
		this.props.onUserInput(
			this.state.text
		);
	},
	updateInput: function(ev) {
		this.setState({
			text: ev
		});
	},
	render: function() {
		return (
			<form onSubmit={this.handle} id="bar" style={SearchBarStyle}>
				<SearchBox type="text" onChange={this.updateInput} value={this.state.text} ref="searchText" />
			</form>
			);
	}
});

module.exports = SearchBar;