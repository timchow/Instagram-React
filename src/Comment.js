/*
var React = require('react');

var Comment = React.createClass({
	componentDidMount: function() {
	},
	getInitialState: function() {
		return {
		};
	},
	render: function() {
		return (
			<tr>
        		<td>
        			{this.props.by_username}: {this.props.text}
        		</td>
        	</tr>
			);
	}
});
*/
import React from 'react';

class Comment extends React.Component {
	render() {
	    return (	
	    		<li>
        			{this.props.by_username}: {this.props.text}
        		</li>
			);
  	}
}

export default Comment;