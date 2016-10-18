var React = require('react');
var OfficeFabric = require('office-ui-fabric-react');
var InstagramService = require('./InstagramService.js');

var Photo = React.createClass({

    showDialog: function() {
    	// Retrieve comments/likes
    	// Trigger event and pass data to dialog
    	var that = this;
    	InstagramService.getComments(this.props.media_id).then(function(res) {
    		console.log(res)
    		$(window).trigger('beans', 
	        	{
	        		comments: res.data,
	        		bigImage: that.props.bigImage,
                    caption: that.props.caption
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

        return (
        	<tr>
        		<td>
        			<div>
        				<a onClick={this.showDialog}><img src={this.props.imageUrl} className='photoOnFrame'></img></a>
        			</div>
        			<div>
        				<p>{this.props.caption} - {this.props.likes}</p>
        			</div>
        		</td>
        	</tr>
        );
    }
});

module.exports = Photo;
