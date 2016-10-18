var React = require('react');
var OfficeFabric = require('office-ui-fabric-react');
var InstagramService = require('./InstagramService.js');

var Photo = React.createClass({

    showDialog: function() {
    	// Retrieve comments/likes
    	var that = this;
    	InstagramService.getComments(this.props.media_id).then(function(res) {
    		console.log(res)
            // Passing photo data to dialog
    		$(window).trigger('photoClicked', 
	        	{
	        		comments: res.data,
	        		bigImage: that.props.bigImage,
                    caption: that.props.caption,
                    likes: that.props.likes
	        	}
        	);
    	});

    },
    getInitialState: function() {
        return {
            dialog: false
        };
    },
    render: function() {
        var photoStyle = {
            display: 'inline-block',
            width: '30%',
            padding: '20px'
        };
        return (
                <li style={photoStyle}>
        			<div>
        				<a onClick={this.showDialog}><img src={this.props.imageUrl} className='photoOnFrame'></img></a>
        			</div>
                </li>
        );
    }
});

module.exports = Photo;
