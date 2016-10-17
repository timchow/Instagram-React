var React = require('react');
var Photo = require('./Photo.js');
var InstagramService = require('./InstagramService.js');

var PhotoFrame = React.createClass({
    retrievePhotos: function(user_id, max_id) {
        var that = this;

        InstagramService.getRecentUserMedia(user_id, max_id).then(function(res) {
            if (res.data.length == 0) {
                console.log("No photos to load!");
                return;
            }

            that.setState({
                media: that.state.media.concat(res.data),
                max_id: res.data[res.data.length-1].id,
                user_id: user_id
            });
        });
    },
    retrieveMorePhotosOnScroll: function() {
        var that = this;
        $(window).off('scroll');
        $(window).on('scroll', function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                that.retrievePhotos(that.state.user_id, that.state.max_id);
            }
        });
    },
    getInitialState: function() {
        return {
            media: [],
            max_id: null,
            user_id: null
        };
    },
    componentDidMount: function() {
        var that = this;
        $('#bar').on('search', function(e) {
            var user_name = this.props.searchText;
            InstagramService.getUserInfo(user_name).then(function(res) {
                that.setState(that.getInitialState());
                that.retrievePhotos(res.user.id);
                that.retrieveMorePhotosOnScroll();
            });
        }.bind(this));
    },
    componentWillUnmount: function() {
        $('#bar').off('search');
        $(window).off('scroll');
    },
    render: function() {
        var photos = [];
        
        this.state.media.forEach(function(media){
            var imageUrl = media.images.low_resolution.url;
            var likes = media.likes.count;
            var caption = media.caption.text;
            //console.log(media)
            photos.push(
                <Photo 
                    imageUrl={imageUrl}
                    likes={likes}
                    caption={caption}
                />
            );
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