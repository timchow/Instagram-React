var React = require('react');
var InstagramService = require('./InstagramService.js');

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop].count;
    }
    return total;
}

var Insights = React.createClass({
	componentDidMount: function() {
		var that = this;
		var user_name = this.props.routeParams.user_name;
		InstagramService.getUserId(user_name).then(function(res) {
			InstagramService.getAllUserMedia(res).then(function(res) {
				var photos = res;
				var users = {};
				var sum = 0;
				photos.forEach(function(photo) {
					InstagramService.getLikes(photo.id).then(function(res) {
						res.forEach(function(user) {
							var user_name = user.username;
							users[user_name] = (users[user_name] || 0) + 1;
							
						});
						
						that.setState({biggestFans: users});
					});
				});
			});
		});
	},
	getInitialState: function() {
		return {
			biggestFans: {},
			sum: 0
		};
	},
	render: function() {
		// TODO: Clean this crap up
		var result = [];
		var fans = this.state.biggestFans;
		for (var likes in fans)
			result.push([likes, fans[likes]])

		result.sort(
			function(a, b) {
				return b[1] - a[1]
			}
		)
		
		var topUsers = [];

		result.slice(0,10).forEach(function(res) {
			topUsers.push(<div>{res[0]} - {res[1]}</div>);
		});

		return (
				<ul>
					{topUsers}
				</ul>
			);
	}
});

module.exports = Insights;