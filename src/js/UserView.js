var React = require('react');

var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame');
var NewDialog = require('./Dialog.js');
var InsightsView = require('./Insights.js');

import {Panel, PanelType} from 'office-ui-fabric-react';
import {Router, Route, Link} from 'react-router';

import UserBox from './UserBox'

var UserView = React.createClass({
	getInitialState: function() {
		return {
			showDialog: false,
			showPanel: false
		};
	},
	componentDidMount: function() {
		var that = this;
		$(window).on('photoClicked', function() {
			that.setState({
				showDialog: true
			});
		});
	},
	_showDialog: function() {
		this.setState( {showDialog: true } );
	},
	_closeDialog: function() {
		this.setState( {showDialog: false } );
	},
	_showPanel: function() {
		this.setState({showPanel: true});
	},
	_closePanel: function() {
		this.setState({showPanel: false});
	},
	render: function() {
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
					                        <div className="ms-Grid-col ms-u-sm6 ig-userinfo-bar">
					                            <UserBox user_name={user_name} showPanel={this._showPanel} />
					                        </div>
					                        <div className="ms-Grid-col ms-u-sm6">
					                            
					                        </div>
					                    </div>
					                </div>
					            </div>
					            <div className="ms-Grid-col ms-u-sm3 ig-search-bar">
					                <SearchBar indexStyle={{}} label={user_name} />
					            </div>		        			
			        		</div>
			        		<div className="ms-Grid-row ig-body-content">
			        			<div className="ms-Grid-col ms-u-sm1"></div>
		                        <div className="ms-Grid-col ms-u-sm11 ig-photoFrame">
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
});

module.exports = UserView;