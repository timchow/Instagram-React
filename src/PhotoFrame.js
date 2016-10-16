var React = require('react');
function callback (data){

        }
var PhotoFrame = React.createClass({
    getUserInfo: function(user) {
        // get data from IG api
        var reqUrl = "https://www.instagram.com/"+user+"/?__a=1";
        var options = {
            url: reqUrl,
            crossDomain: true,
            success: function(data) {
                console.log(data);
            }
        };

        /*$.get(reqUrl).done(function(data){
            console.log(data)
        });*/
        /*$.when($.ajax(options)).then(function(data, status, jqHR){
            console.log(data);
        });*/
        $.ajax(options);
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