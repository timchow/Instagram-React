var ReactDOM = require('react-dom');
var React = require('react');
 
var SearchBar = require('./SearchBar');
var PhotoFrame = require('./PhotoFrame');
var NewDialog = require('./Dialog.js');
var TotalLikes = require('./TotalLikes.js');

var Router = require('react-router').Router
var Route = require('react-router').Route

var Search = React.createClass({
	render: function() {
		var indexStyle = this.props.indexStyle || {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)'
		};

		return (
			<div style={indexStyle}>
				<SearchBar />
			</div>
		);
	}
});

var UserFrame = React.createClass({
	getInitialState: function() {
		return {
			showDialog: false
		};
	},
	componentDidMount: function() {
		var that = this;
		$(window).on('photoClicked', function() {
			that.setState({
				showDialog: true
			});
		});
	},
	_showDialog: function() {
		this.setState( {showDialog: true } );
	},
	_closeDialog: function() {
		this.setState( {showDialog: false } );
	},
	render: function() {
		return (
			<div className="ms-Grid"> 
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-u-sm6">
						<Search indexStyle={{}} />
					</div>
					<div className="ms-Grid-col ms-u-sm6">
						<div className="ms-Grid"> 
						  <div className="ms-Grid-row">
						    <div className="ms-Grid-col ms-u-sm6">
						    	<TotalLikes user_name={this.props.routeParams.user_name} />
						    </div>
						    <div className="ms-Grid-col ms-u-sm6">
						    </div>
						  </div>
						</div>
					</div>
				</div>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-u-sm12">
						<PhotoFrame
							user_name={this.props.routeParams.user_name}
						/>
						<NewDialog 
							showDialog={this._showDialog} 
							closeDialog={this._closeDialog}
							dialogState={this.state.showDialog}
						/>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render((
  <Router>
    <Route path="/" component={Search} />
    <Route path="user/:user_name" component={UserFrame} />
  </Router>
), document.getElementById('app'));