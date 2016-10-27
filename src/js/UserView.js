import React from 'react';
import {Panel, PanelType} from 'office-ui-fabric-react';

import SearchBar from './SearchBar';
import PhotoFrame from './PhotoFrame';
import NewDialog from './Dialog';
import InsightsView from './InsightsView';
import UserBox from './UserBox'
import InstagramService from './InstagramService';

export default class UserView extends React.Component {
	constructor() {
		console.log("UserView - Constructor")
		super();
		this.state = {
			showDialog: false,
			showPanel: false
		}
		this._closeDialog = this._closeDialog.bind(this);
		this.showDialog = this._showDialog.bind(this);
		this._showPanel = this._showPanel.bind(this);
		this._closePanel = this._closePanel.bind(this);
	}

	componentDidMount() {
		console.log("UserView - Mounted")
		var that = this;
		$(window).on('photoClicked', function() {
			that.setState({
				showDialog: true
			});
		});

		InstagramService.getUserInfo(this.props.routeParams.user_name).then(function(res) {
			that.setState({userInfo: res}, function() { console.log(100)});
		});
	}
	_showDialog() {
		this.setState( {showDialog: true } );
	}
	_closeDialog() {
		this.setState( {showDialog: false } );
	}
	_showPanel() {
		this.setState({showPanel: true});
	}
	_closePanel() {
		this.setState({showPanel: false});
	}
	render() {
		console.log("UserView - Render")
		console.log("UserView - State");
		console.log(this.state)
		var user_name = this.props.routeParams.user_name,
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
					                            <UserBox userInfo={this.state.userInfo} showPanel={this._showPanel} />
					                        </div>
					                    </div>
					                </div>
					            </div>
					            <div className="ms-Grid-col ms-u-sm3 ig-search-bar">
					                <SearchBar indexStyle={{}} label={user_name} />
					            </div>		        			
			        		</div>
			        		<div className="ms-Grid-row ig-body-content">
		                        <div className="ms-Grid-col ms-u-sm12 ig-photoFrame">
		                            <PhotoFrame userInfo={this.state.userInfo} />
		                            <NewDialog showDialog={this._showDialog} closeDialog={this._closeDialog} dialogState={this.state.showDialog} />
		                        </div>
			        		</div>
			        	</div>
			        </div>
			    </div>
			    <Panel
					isOpen={ this.state.showPanel }
					isLightDismiss={ true }
					onDismiss= { this._closePanel }
					type={PanelType.smallFixedNear}
				>
					<div className="ms-Grid ms-font-xxl ig-panel-content">
					    <div className="ms-Grid-row">
					        <div className="ms-Grid-col ms-u-sm12">
					        	<a href={`/user/${user_name}/insights`}>{"User insights!"}</a>
					        </div>
					    </div>
					</div>
				</Panel>
			</div>
		);
	}
};