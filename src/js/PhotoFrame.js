var React = require('react');
var OF = require('office-ui-fabric-react');

var Photo = require('./Photo.js');
var InstagramService = require('./InstagramService.js');

var PhotoFrame = React.createClass({
    retrievePhotos: function(user_id, max_id) {
        var that = this;
        
        InstagramService.getRecentUserMedia(user_id, max_id).then(function(res) {
            if (res == undefined){
                alert('Private user');
            }
            else if (res.length == 0) {
                return;
            }

            that.setState({
                media: that.state.media.concat(res),
                max_id: res[res.length-1].id,
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
            user_id: null,
        };
    },
    componentDidMount: function() {
        var that = this;
        var user_name = this.props.user_name;

        InstagramService.getUserId(user_name).then(function(res) {
            that.setState(that.getInitialState());
            that.retrievePhotos(res);
            that.retrieveMorePhotosOnScroll();
        });
    },
    componentWillUnmount: function() {
        $(window).off('scroll');
    },
    render: function() {
        var photos = [];

        this.state.media.forEach(function(media){
            var imageUrl = media.images.low_resolution.url;
            var bigImageUrl = media.images.standard_resolution.url;
            var likes = media.likes.count;
            var caption = media.caption ? media.caption.text : "";
            var media_id = media.id;

            photos.push(
                <Photo 
                    imageUrl={imageUrl}
                    likes={likes}
                    caption={caption}
                    media_id={media_id}
                    bigImage={bigImageUrl}
                />
            );
        });

        return (
            <div className="ms-Grid" > 
                <div className="ms-Grid-row">
                    {photos}
                </div>
            </div>
            );
    }
});

module.exports = PhotoFrame;