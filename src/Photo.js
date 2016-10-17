var React = require('react');

var Photo = React.createClass({
    render: function() {

        return (
        	<tr>
        		<td>
        			<div>
        				<img src={this.props.imageUrl}></img>
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
