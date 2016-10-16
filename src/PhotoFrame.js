var React = require('react');

var PhotoFrame = React.createClass({
    getUserInfo: function(user) {
        // get data from IG api
        $.ajax({
          dataType: "json",
          url: "/userInfo?user="+user,
          success: function(res){console.log(res)}
        });
    },
    componentDidMount: function() {
        $('#bar').on('search', function(e) {
            var user =this.props.searchText;
            var data = this.getUserInfo(user);
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