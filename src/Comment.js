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
        			<div>
        				{this.props.by_username}: {this.props.text}
        			</div>
        		</td>
        	</tr>
			);
	}
});

module.exports = Comment;