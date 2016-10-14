var React = require('react');

var PhotoFrame = React.createClass({
    getUserinfo: function(user) {
        // get data from IG api
        var req = "https://www.instagram.com/"+user+"/?__a=1";
        $.ajax()
    },
    componentDidMount: function() {
        $('#bar').on('search', function(e) {
            var user =this.props.searchText;
            var data = getUserInfo(user);
        }.bind(this));

    },
    componentWillUnmount: function() {
        $('#bar').off('search');
    },
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