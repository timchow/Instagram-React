var React = require('react');
var OfficeFabric = require('office-ui-fabric-react');
var InstagramService = require('./InstagramService.js');

var Photo = React.createClass({

    showDialog: function() {
    	var that = this;
    	InstagramService.getComments(this.props.media_id).then(function(res) {
            // Passing photo data to dialog
    		$(window).trigger('photoClicked', 
	        	{
	        		comments: res,
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
            textAlign: "center",
            padding: "30px 0px"
        };
        return (
            <div className="ms-Grid-col ms-u-sm12 sm-u-md12 ms-u-lg6 ms-u-xl4 ms-u-xxl3 ms-u-xxxl2" style={photoStyle}>
                <a onClick={this.showDialog}><img src={this.props.imageUrl} className='photoOnFrame'></img></a>
            </div>
        );
    }
});

module.exports = Photo;
