import React from 'react';
import {SearchBox, Button, ButtonType} from 'office-ui-fabric-react';

const SearchBarStyle = {
	width: '300px',
	zIndex: '0',
	marginLeft: 'auto',
	marginRight: '0'
};

export default class SearchBar extends React.Component {
	constructor() {
		super();
		this.state = { text: ''};
		this.updateInput = this.updateInput.bind(this);
	}

	updateInput(ev) {
		this.setState({
			text: ev
		});
	}

	render() {

		return (
			<form id="bar" style={SearchBarStyle} action={`/user/${this.state.text}`} method='GET'>
				<SearchBox type="text" onChange={this.updateInput} value={this.state.text} ref="searchText" labelText={this.props.label} />
			</form>
			);
	}
};