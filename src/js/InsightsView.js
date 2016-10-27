import React from 'react';
import {Label, Spinner, SpinnerType} from 'office-ui-fabric-react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts';

import InstagramService from './InstagramService';



Array.prototype.sum = (prop) => {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop].count;
    }
    return total;
}

export default class InsightsView extends React.Component {
	constructor() {
		super();
		this.state = {
			likers: []
		}
	}
	getTopNLikers(likers, n) {
		const topLikers = [];

		for (var likes in likers) {
			topLikers.push([likes, likers[likes]]);
		}

		topLikers.sort((a, b) =>  b[1] - a[1]);
		
		return topLikers.slice(0,n);
	}

	componentDidMount() {
		const that = this,
			user_name = this.props.routeParams.user_name;
		
		InstagramService.getAllUserMediaLikes(user_name).then(function(res) {
			that.setState({likers: res}, () => {
				$(".ig-bargraph-spinner").hide();
				$(".ig-barchart").show();
			});
		});
	}

	render() {
		const topLikers = this.getTopNLikers(this.state.likers, 10),
			likers = topLikers.map((liker) => {
				return {
					name: liker[0],
					Likes: liker[1]
				};
			});

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
					<BarChart className="ig-barchart" width={1200} height={600} data={likers}
						margin={{top: 5, right: 30, left: 20, bottom: 5}}
						onMouseOver={function(e){console.log(e)}}>
					<XAxis dataKey="name" 
						tickCount={10} />
					<YAxis
						tickCount={10} />
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
};