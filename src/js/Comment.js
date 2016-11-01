import React from 'react';

const listItemStyle = {
};

const listItemUserStyle = {
	fontWeight: 'bold'
};

export default class Comment extends React.Component {
	render() {
	    return (	
	    		<li style={listItemStyle}>
        			<span className="ms-font-m" style={listItemUserStyle}>{this.props.by_username}</span> <span>{this.props.text}</span>
        		</li>
			);
  	}
};