import React from 'react';

import Comment from './Comment.js';

export default class CommentsBox extends React.Component {
	constructor() {
		super();
	}

	render() {
		const comments = [];
		this.props.comments.forEach((comment) => {
			const comment_text = comment.text,
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
				<ul>
				{comments.map(function(object, i) {
                       return <div key={i}>{object}</div>; 
                     })}
				</ul>
			</div>
			);
	}
};