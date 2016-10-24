var React = require('react');
var InstagramService = require('./InstagramService.js');
var Recharts = require('recharts')

import {Label, Spinner, SpinnerType} from 'office-ui-fabric-react';

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

		var likers = {};
		InstagramService.getUserInfo(user_name).then(function(res) {
			InstagramService.getAllUserMedia(res.id).then(function(res) {
				var requestArr = [];
				
				requestArr = res.map(function(photo) {
					return InstagramService.getLikes(photo.id);
				});

				$.when.apply(this, requestArr).done(function(res) {
					Array.prototype.slice.call(arguments).forEach(function(users) {
						users.forEach(function(user){
							var user_name = user.username;
							likers[user_name] = (likers[user_name] || 0) + 1;
						});				
					});
					that.setState({likers: likers}, function() {
						$(".ig-bargraph-spinner").hide();
					});
				});
				/*
				photos.forEach(function(photo) {

					InstagramService.getLikes(photo.id).then(function(res) {
						res.forEach(function(user) {
							var user_name = user.username;
							users[user_name] = (users[user_name] || 0) + 1;
						});
						that.setState({likers: users});
					});
				});*/
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
			likers = topLikers.map(function(liker) {
				return {
					name: liker[0],
					Likes: liker[1]
				}
			});

		const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} = Recharts;

		const colors =['#e81123', 
						'#ea2838', 
						'#ec404e',
						'#ee5865', 
						'#f1707b', 
						'#f38891', 
						'#f59fa7', 
						'#F8B7BD', 
						'#facfd3', 
						'#fce7e9'];

		return (
				<div>
					<Spinner className="ig-bargraph-spinner" type={ SpinnerType.large } label="Retrieving all likes for user's media!" />
					<BarChart width={1200} height={300} data={likers}
						margin={{top: 5, right: 30, left: 20, bottom: 5}}
						onClick={function(e){console.log(e)}}>
					<XAxis dataKey="name" 
						tickCount={10} />
					<YAxis/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip />
					<Legend />

					<Bar dataKey="Likes" >
						{
							likers.map((entry, index) => (
								<Cell fill={colors[index]} />
							))
						}
					</Bar>
					</BarChart>
				</div>
			);
	}
});

module.exports = Insights;