var React = require('react');
var InstagramService = require('./InstagramService.js');

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop].count;
    }
    return total;
}

var TotalLikes = React.createClass({
	componentDidMount: function() {
		var that = this;
		var user_name = this.props.user_name
		InstagramService.getUserId(user_name).then(function(res) {
			InstagramService.getAllUserMedia(res).then(function(res) {
				that.setState({
					totalLikes: res.sum("likes"),
					totalComments: res.sum("comments")
				});
			});
		});
	},
	getInitialState: function() {
		return {
			totalLikes: [],
			totalComments: []
		};
	},
	render: function() {
		return (
				<div>{this.state.totalLikes} Likes {this.state.totalComments} Comments</div>
			);
	}
});



module.exports = TotalLikes;