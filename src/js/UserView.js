import React from 'react';
import SearchBar from './SearchBar';
import PhotoFrame from './PhotoFrame';
import NewDialog from './Dialog';
import InsightsView from './InsightsView';

import {Panel, PanelType} from 'office-ui-fabric-react';
import {Router, Route, Link} from 'react-router';
import UserBox from './UserBox'

class UserView extends React.Component {
	constructor() {
		super();
		this.state = {
			showDialog: false,
			showPanel: false
		}
		this._closeDialog = this._closeDialog.bind(this);
		this._showPanel = this._showPanel.bind(this);
	}

	componentDidMount() {
		var that = this;
		$(window).on('photoClicked', function() {
			that.setState({
				showDialog: true
			});
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
					                            <UserBox user_name={user_name} showPanel={this._showPanel} />
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
		                            <PhotoFrame user_name={user_name} />
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

export default UserView;