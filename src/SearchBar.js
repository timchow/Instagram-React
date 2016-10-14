var React = require('react');

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
			text: ev.target.value
		});
	},
	render: function() {
		return (
			<form onSubmit={this.handle} id="bar">
				<input type="text" onChange={this.updateInput} value={this.state.text} ref="searchText"></input>
				<input type="submit" value="Search"></input>
			</form>
			);
	}
});

module.exports = SearchBar;