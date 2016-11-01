import React from 'react';

import NewPanel from './NewPanel';
import SearchBar from './SearchBar';
import PhotoFrame from './PhotoFrame';
import NewDialog from './Dialog';
import InsightsView from './InsightsView';
import UserBox from './UserBox'
import InstagramService from './InstagramService';

export default class UserView extends React.Component {
	constructor() {
		super();
		this.state = {
			userInfo: {}
		}	
	}

	componentDidMount() {
		InstagramService.getUserInfo(this.props.routeParams.user_name).then((res) => {
			this.setState({userInfo: res});
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
    }

	render() {
		const user_name = this.props.routeParams.user_name,
			insightsUrl = "/user/"+user_name+"/insights";
		return (
			<div className="ms-Grid ig-app-content">
			    <div className="ms-Grid-row">
			        <div className="ms-Grid-col ms-u-sm12 ig-body">
			        	<div className="ms-Grid">
			        		<div className="ms-Grid-row ig-top-bar">
					            <div className="ms-Grid-col ms-u-sm8 ig-user-bar ms-font-xxl">
					                <div className="ms-Grid">
					                    <div className="ms-Grid-row">
					                        <div className="ms-Grid-col ms-u-sm12 ig-userinfo-bar">
					                            <UserBox userInfo={this.state.userInfo} />
					                        </div>
					                    </div>
					                </div>
					            </div>
					            <div className="ms-Grid-col ms-u-sm4 ig-search-bar">
					                <SearchBar indexStyle={{}} label={user_name} />
					            </div>		        			
			        		</div>
			        		<div className="ms-Grid-row ig-body-content">
		                        <div className="ms-Grid-col ms-u-sm12 ig-photoFrame">
		                            <PhotoFrame userInfo={this.state.userInfo} />
		                        </div>
			        		</div>
			        	</div>
			        </div>
			    </div>
			    <NewDialog />
			    <NewPanel userInfo={this.state.userInfo} />
			</div>
		);
	}
};