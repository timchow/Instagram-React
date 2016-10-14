var React = require('react');

var PhotoFrame = React.createClass({
    componentDidMount: function() {
        $('#bar').on('search', function(e) {
            console.log(this.props.searchText);
        }.bind(this));
    },
    componentWillUnmount: function() {
        $('#bar').off('search');
    }
    ,
    render: function() {
        var rows = [];
        return (
            <div>
            <table>
            <thead>
            </thead>
            <tbody>{rows}</tbody>
            </table>

            </div>
        );
    }
});

module.exports = PhotoFrame;