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
	getTopNLikers: function(likers, n) {
		var topLikers = [];

		for (var likes in likers) {
			topLikers.push([likes, likers[likes]]);
		}

		topLikers.sort(function(a, b) {return b[1] - a[1]});
		
		return topLikers.slice(0,n);
	},
	componentDidMount: function() {
		var that = this,
			user_name = this.props.routeParams.user_name;

		InstagramService.getUserInfo(user_name).then(function(res) {
			InstagramService.getAllUserMedia(res.id).then(function(res) {
				var photos = res;
				var users = {};
				photos.forEach(function(photo) {
					InstagramService.getLikes(photo.id).then(function(res) {
						res.forEach(function(user) {
							var user_name = user.username;
							users[user_name] = (users[user_name] || 0) + 1;
						});
						that.setState({likers: users});
					});
				});
			});
		});
	},
	getInitialState: function() {
		return {
			likers: {},
			sum: 0
		};
	},
	render: function() {
		var topLikers = this.getTopNLikers(this.state.likers, 10),
			likers = topLikers.map(function(liker) {return <div>{liker[0]} - {liker[1]}</div>});

		return (
				<ul>
					{likers}
				</ul>
			);
	}
});

module.exports = Insights;