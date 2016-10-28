import React from 'react';
import {Panel, PanelType} from 'office-ui-fabric-react';


export default class NewPanel extends React.Component {
	constructor() {
		super();
		this.state = { showPanel: false };

		this._showPanel = this._showPanel.bind(this);
		this._closePanel = this._closePanel.bind(this);
	}

	componentDidMount() {
		$(window).on('TogglePanel', this._showPanel);
	}

	_showPanel() {
		this.setState({showPanel: true});
	}
	_closePanel() {
		this.setState({showPanel: false});
	}

	render() {
		const user_name = this.props.userInfo.username;

		return (
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
		);
	}
}