import React from 'react';

import Photo from './Photo';
import InstagramService from './InstagramService';

export default class PhotoFrame extends React.Component {
    constructor() {
        super();
        this.retrievePhotos = this.retrievePhotos.bind(this);
        this.retrieveMorePhotosOnScroll = this.retrieveMorePhotosOnScroll.bind(this);

        this.state = this.initialState = {
            media: [],
            max_id: null,
            user_id: null
        };
    }

    retrievePhotos(user_id, max_id) {
        var that = this;
        
        InstagramService.getRecentUserMedia(user_id, max_id).then(function(res) {
            if (res == undefined){
                alert('Private user');
            }
            else if (res == 404) {
                alert(res);
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
    }

    retrieveMorePhotosOnScroll() {
        var that = this;
        $(window).off('scroll');
        $(window).on('scroll', function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                that.retrievePhotos(that.state.user_id, that.state.max_id);
            }
        });
    }

    componentDidMount() {
        var that = this;
        var user_name = this.props.user_name;
        
        InstagramService.getUserInfo(user_name).then(function(res) {
            console.log(res)
            if (res == undefined || res.is_private) {
                console.log("inside")
                return;
            }
            console.log("12")
            that.setState(that.initialState);
            that.retrievePhotos(res.id);
            that.retrieveMorePhotosOnScroll();
        }, function(e) {
            $('.ig-stats-spinner').hide();
        });
    }

    componentWillUnmount() {
        $(window).off('scroll');
    }

    render() {
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
};