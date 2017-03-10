import React from 'react';
import {Label, Spinner, SpinnerType} from 'office-ui-fabric-react'

import InstagramService from './InstagramService';
import Utility from './Utility';

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
			let user_id = nextProps.userInfo.id;

			if (Utility.isUserPhotosCached(user_id)) {
				let cachedPhotosObject = Utility.getCachedPhotosForUser(user_id),
                	cachedPhotos = cachedPhotosObject[2];

				this.setState({
						totalLikes: cachedPhotos.sum("likes"),
						totalComments: cachedPhotos.sum("comments")
				}, () => {
					$('.ig-stats-spinner').hide();
					cachedPhotosObject[0] = 20;
            		Utility.setCachedPhotosForUser(user_id, cachedPhotosObject);
            		console.log("Retrieved photos for stats from cache!");
				});
			}
			else {
				InstagramService.getAllUserMedia(user_id).then((res) => {
					this.setState({
						totalLikes: res.sum("likes"),
						totalComments: res.sum("comments")
					}, () => {
						$('.ig-stats-spinner').hide();
						let photosObject = [20, res.length, res];
						Utility.setCachedPhotosForUser(user_id, photosObject);
						console.log("Cached photos for stats!");
					});
				});
			}


			
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