import React from 'react';

import InstagramService from './InstagramService';

var photoStyle = {
    textAlign: "center",
    padding: "30px 0px"
};

class BaseComponent extends React.Component {
    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }
}

export default class Photo extends BaseComponent {
    constructor() {
        super();
        this._bind('showDialog');

        this.state = { dialog: false };
    }
    

    showDialog() {
    	var that = this;
    	InstagramService.getComments(this.props.media_id).then(function(res) {
            // Passing photo data to dialog
    		$(window).trigger('photoClicked', 
	        	{
	        		comments: res,
	        		bigImage: that.props.bigImage,
                    caption: that.props.caption,
                    likes: that.props.likes,
	        	}
        	);
    	});
    }

    render() {
        return (
            <div className="ms-Grid-col ms-u-sm12 sm-u-md12 ms-u-lg6 ms-u-xl4 ms-u-xxl3 ms-u-xxxl2" style={photoStyle}>
                <a onClick={this.showDialog}><img src={this.props.imageUrl} className='photoOnFrame'></img></a>
            </div>
        );
    }
};
