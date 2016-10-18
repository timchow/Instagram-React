var React = require('react');
var Photo = require('./Photo.js');
var OF = require('office-ui-fabric-react');

var Button = OF.Button;
var ButtonType = OF.ButtonType;
var ChoiceGroup = OF.ChoiceGroup;
var Dialog = OF.Dialog;
var DialogFooter = OF.DialogFooter;
var DialogType = OF.DialogType;

var NewDialog = React.createClass({
	componentDidMount: function() {
		var that = this;
		$(window).on('beans', function() {
			var photoData = Array.prototype.slice.call(arguments,1)[0];
			that.setState({
				comments: photoData.comments,
				image: photoData.bigImage,
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
			isDarkOverlay={true}
			title='Instagram modal!'
			subText='Subtext!'
			isBlocking={ false }
			containerClassName='dialogOverlay'
			>
			<img src={this.state.image} />
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