var React = require('react');
var OfficeFabric = require('office-ui-fabric-react');

var Photo = React.createClass({

    showDialog: function() {
        $(window).trigger('beans', ['1','2']);

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
        				<a href="#" onClick={this.showDialog}><img src={this.props.imageUrl}></img></a>
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
