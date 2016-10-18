var React = require('react');
var Comment = require('./Comment.js');

var Comments = React.createClass({
	componentDidMount: function() {
	},
	getInitialState: function() {
		return {
		};
	},
	render: function() {
		var comments = [];
		this.props.comments.forEach(function(comment) {
			var comment_text = comment.text,
				comment_time = comment.created_time,
				comment_by_username = comment.from.username,
				comment_by_userImage = comment.from.profile_picture,
				comment_by_id = comment.from.id,
				comment_id = comment.id;

			comments.push(<Comment 
								text={comment_text}
								time={comment_time}
								by_username={comment_by_username}
								comment_by_userImage={comment_by_userImage}
								comment_by_id={comment_by_id}
								comment_id = {comment_id}
							/>);

		});
		return (
			<div>
				{comments}
			</div>
			);
	}
});

module.exports = Comments;