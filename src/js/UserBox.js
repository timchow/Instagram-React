import React from 'react';
import {Button, ButtonType } from 'office-ui-fabric-react'

import InstagramService from './InstagramService';
import Stats from './Stats';

class UserBox extends React.Component {
	constructor() {
		super();
    	this.state = { full_name: '', profile_picture: '', biography:'' }
  	}

	componentDidMount() {
		var that = this,
			user_name = this.props.user_name;

		InstagramService.getUserFullName(user_name).then(function(res) {
			that.setState( { full_name: res } );
		});
		InstagramService.getUserProfilePicture(user_name).then(function(res) {
			that.setState( {profile_picture: res} );
		});
		InstagramService.getUserBiography(user_name).then(function(res) {
			that.setState( {biography: res} );
		});
	}
	render() {
	    return (	
	    		<div className="ms-Grid">
	    			<div className="ms-Grid-row">
	    				<div className="ms-Grid-col ms-u-sm4 ig-user-photo">
	    					<img src={this.state.profile_picture} />
	    				</div>
	    				<div className="ms-Grid-col ms-u-sm5">
	    					<div className="ms-Grid"> 
								<div className="ms-Grid-row">
									<div className="ms-Grid-col ms-u-sm12 ig-user-fullname">
										<i className="ms-Icon ms-Icon--Contact statsIcons" aria-hidden="true"></i>   {this.state.full_name}
									</div>
								</div>
								<div className="ms-Grid-row">
									<div className="ms-Grid-col ms-u-sm12">
										<Stats user_name={this.props.user_name} />
									</div>
								</div>
								<div className="ms-Grid-row">
									<Button
										disabled={ false }
										buttonType={ ButtonType.hero }
										icon='Add'
										onClick={this.props.showPanel} >
										More
									</Button>	
								</div>
							</div>
	    				</div>
	    				<div className="ms-Grid-col ms-u-sm3">
	    					{this.state.biography}
	    				</div>
	    			</div>
        		</div>
			);
  	}
}

export default UserBox;