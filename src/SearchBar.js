var React = require('react');
 
var SearchBar = React.createClass({
  render: function() {
    return (
    		<form>
    			<input type="text" value={this.props.searchText} placeholder="ricegum"></input>
    			<input type="submit" value="Search"></input>
    		</form>
    	);
  }
});

 module.exports = SearchBar;