import React from 'React';
import {Button, ButtonType, Dialog, DialogFooter, DialogType} from 'office-ui-fabric-react';

import Photo from './Photo';
import CommentsBox from './CommentsBox';

const imgStyle = {
	width: '500px',
	height: 'auto'
};

export default class NewDialog extends React.Component{
	constructor() {
		super();
		this._showDialog = this._showDialog.bind(this);
		this._closeDialog = this._closeDialog.bind(this);
		
		this.state = {
			image: '',
			likes: [],
			comments: [],
			showDialog: false
		}
	}

	componentDidMount() {
		const that = this;

		$(window).on('photoClicked', function() {
			const photoData = Array.prototype.slice.call(arguments,1)[0];
			that.setState({
				showDialog: true,
				comments: photoData.comments,
				image: photoData.bigImage,
				caption: photoData.caption,
				likes: photoData.likes
			});
		});
	}

	_showDialog() {
		this.setState( {showDialog: true } );
	}
	_closeDialog() {
		this.setState( {showDialog: false } );
	}

	render() {
		return (
			<div>
			<Dialog
				className='dialog'
				id='modal'
				isOpen={ this.state.showDialog }
				type={ DialogType.normal }
				onDismiss={ this._closeDialog }
				isDarkOverlay={ true }
				isBlocking={ false }
				containerClassName='dialogOverlay'
			>
			<div className="ms-Grid">
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-u-sm1 ig-dialog-likes ms-font-xxl">
						{this.state.likes} <i className="ms-Icon ms-Icon--HeartFill statsIcons" aria-hidden="true"></i>
					</div>
					<div className="ms-Grid-col ms-u-sm11 ig-dialog-caption ms-font-l">
						{this.state.caption}
					</div>
				</div>
			  <div className="ms-Grid-row">
			    <div className="ms-Grid-col ms-u-sm6">
			    	<div>
			    		<img src={this.state.image} style={imgStyle} />
			    	</div>
			    </div>
			    <div className="ms-Grid-col ms-u-sm6">
			    	<CommentsBox comments={this.state.comments} />
			    </div>
			  </div>
			</div>
			</Dialog>
			</div>
			);
	}
};