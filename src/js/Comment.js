import React from 'react';

export default class Comment extends React.Component {
	render() {
	    return (	
	    		<li>
        			{this.props.by_username}: {this.props.text}
        		</li>
			);
  	}
};