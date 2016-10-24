var React = require('react');
var InstagramService = require('./InstagramService');
import {Label, Spinner, SpinnerType} from 'office-ui-fabric-react'

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop].count;
    }
    return total;
}

var Stats = React.createClass({
	componentDidMount: function() {
		var that = this;
		var user_name = this.props.user_name;

		InstagramService.getUserInfo(user_name).then(function(res) {
			InstagramService.getAllUserMedia(res.id).then(function(res) {
				that.setState({
					totalLikes: res.sum("likes"),
					totalComments: res.sum("comments")
				}, function() {
					$('.ms-Spinner').hide();
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
				<div className="ms-Grid"> 
					<div className="ms-Grid-row">
						<div className="ms-Grid-col">
							<i className="ms-Icon ms-Icon--HeartFill statsIcons" aria-hidden="true"></i>   <Spinner className="ig-stats-spinner" />{this.state.totalLikes}   
						</div>
					</div>
					<div className="ms-Grid-row">
						<div className="ms-Grid-col">
							<i className="ms-Icon ms-Icon--PencilReply statsIcons" aria-hidden="true"></i>   <Spinner className="ig-stats-spinner" /> {this.state.totalComments}
						</div>
					</div>
				</div>
			);
	}
});

module.exports = Stats;