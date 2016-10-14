var React = require('react');

var PhotoFrame = React.createClass({
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