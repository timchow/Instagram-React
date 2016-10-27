import React from 'react';
import {Label, Spinner, SpinnerType} from 'office-ui-fabric-react'

import InstagramService from './InstagramService';

Array.prototype.sum = function(prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop].count;
    }
    return total;
}

export default class Stats extends React.Component{
	constructor() {
		super();
		this.state = {
			totalLikes: [],
			totalComments: []
		}
	}

	componentDidMount() {
		var that = this;
		var user_name = this.props.user_name;
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.userInfo.is_private) {
			InstagramService.getAllUserMedia(nextProps.userInfo.id).then((res) => {
				this.setState({
					totalLikes: res.sum("likes"),
					totalComments: res.sum("comments")
				}, () => {
					$('.ig-stats-spinner').hide();
				});
			});
		}
	}

	render() {
		return (
				<div className="ms-Grid"> 
					<div className="ms-Grid-row">
						<div className="ms-Grid-col">
							<i className="ms-Icon ms-Icon--HeartFill statsIcons" aria-hidden="true"></i>   <Spinner className="ig-stats-spinner" />{this.state.totalLikes}   
						</div>
					</div>
					<div className="ms-Grid-row">
						<div className="ms-Grid-col">
							<i className="ms-Icon ms-Icon--PencilReply statsIcons" aria-hidden="true"></i>   <Spinner className="ig-stats-spinner" /> {this.state.totalComments}
						</div>
					</div>
				</div>
			);
	}
};