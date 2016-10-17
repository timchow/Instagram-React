var React = require('react');
var Photo = require('./Photo.js');
var InstagramService = require('./InstagramService.js');

var PhotoFrame = React.createClass({
    getInitialState: function() {
        return {
            media: []
        };
    },
    componentDidMount: function() {
        var that = this;
        $('#bar').on('search', function(e) {
            var user = this.props.searchText;
            
            InstagramService.getUserInfo(user).then(function(res){
                InstagramService.getRecentUserMedia(res.user.id).then(function(res) {
                    that.setState({
                        media: res.data
                    });
                });
            });
            
        }.bind(this));

    },
    componentWillUnmount: function() {
        $('#bar').off('search');
    },
    render: function() {
        var photos = [];
        
        this.state.media.forEach(function(media){
            var imageUrl = media.images.low_resolution.url;
            var likes = media.likes.count;
            var caption = media.caption.text;
            
            photos.push(<Photo 
                            imageUrl={imageUrl}
                            likes={likes}
                            caption={caption}
                        />);
        });

        return (
            <div>
            <table>
            <thead>
            </thead>
            <tbody>{photos}</tbody>
            </table>
            </div>
            );
    }
});

module.exports = PhotoFrame;