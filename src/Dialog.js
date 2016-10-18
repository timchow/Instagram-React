var React = require('react');
var Photo = require('./Photo.js');
var CommentsBox = require('./CommentsBox.js');
var OF = require('office-ui-fabric-react');

var Button = OF.Button;
var ButtonType = OF.ButtonType;
var ChoiceGroup = OF.ChoiceGroup;
var Dialog = OF.Dialog;
var DialogFooter = OF.DialogFooter;
var DialogType = OF.DialogType;

var imgStyle = {
	width: '500px',
	height: 'auto'
};

var NewDialog = React.createClass({
	componentDidMount: function() {
		var that = this;
		$(window).on('beans', function() {
			var photoData = Array.prototype.slice.call(arguments,1)[0];
			that.setState({
				comments: photoData.comments,
				image: photoData.bigImage,
				caption: photoData.caption
			});
		});
	},
	getInitialState: function() {
		return {
			image: '',
			likes: [],
			comments: []
		};
	},
	render: function() {
		var comments = [];
		return (
			<div>
			<Dialog
			className='dialog'
			id='modal'
			isOpen={ this.props.dialogState }
			type={ DialogType.normal }
			onDismiss={ this.props.closeDialog }
			isDarkOverlay={ true }
			title={this.state.caption}
			subText=''
			isBlocking={ false }
			containerClassName='dialogOverlay'
			>
			<div className="ms-Grid"> 
			  <div className="ms-Grid-row">
			    <div className="ms-Grid-col ms-u-sm6">
			    	<div>
			    		<img src={this.state.image} style={imgStyle} />
			    	</div>
			    </div>
			    <div className="ms-Grid-col ms-u-sm6">
			    	<CommentsBox comments={this.state.comments}/>
			    </div>
			  </div>
			</div>
			

			<DialogFooter>
			<Button buttonType={ ButtonType.primary } onClick={this.props.closeDialog}>Save</Button>
			<Button onClick={this.props.closeDialog}>Cancel</Button>
			</DialogFooter>
			</Dialog>
			</div>
			);
	}
});

module.exports = NewDialog;