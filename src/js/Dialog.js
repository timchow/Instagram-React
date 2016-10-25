import React from 'React';
import Photo from './Photo';
import CommentsBox from './CommentsBox';
import {Button, ButtonType, Dialog, DialogFooter, DialogType} from 'office-ui-fabric-react';

var imgStyle = {
	width: '500px',
	height: 'auto'
};

class NewDialog extends React.Component{
	constructor() {
		super();
		this.state = {
			image: '',
			likes: [],
			comments: []
		}
	}

	componentDidMount() {
		var that = this;
		$(window).on('photoClicked', function() {
			var photoData = Array.prototype.slice.call(arguments,1)[0];
			that.setState({
				comments: photoData.comments,
				image: photoData.bigImage,
				caption: photoData.caption,
				likes: photoData.likes
			});
		});
	}

	render() {
		var title = this.state.likes + ": " + this.state.caption;
		return (
			<div>
			<Dialog
			className='dialog'
			id='modal'
			isOpen={ this.props.dialogState }
			type={ DialogType.normal }
			onDismiss={ this.props.closeDialog }
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

export default NewDialog;