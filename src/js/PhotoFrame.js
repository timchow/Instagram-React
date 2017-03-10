import React from 'react';
import Moment from 'moment';

import Photo from './Photo';
import InstagramService from './InstagramService';
import Utility from './Utility';

export default class PhotoFrame extends React.Component {
    constructor(props) {
        super(props);

        this.retrievePhotos = this.retrievePhotos.bind(this);
        this.retrieveMorePhotosOnScroll = this.retrieveMorePhotosOnScroll.bind(this);
        this.state = this.initialState = {
            media: [],
            max_id: null,
            user_id: null
        };
    }

    retrievePhotos(user_id, max_id) {
        if (Utility.isUserPhotosCached(user_id)) {

            let cachedPhotosObject = Utility.getCachedPhotosForUser(user_id),
                cachedPhotos = cachedPhotosObject[2],
                initialPhotoBatch = cachedPhotos.slice(0,20);

            this.setState({
                media: this.state.media.concat(initialPhotoBatch),
                user_id: user_id
            });

            cachedPhotosObject[0] = 20;
            Utility.setCachedPhotosForUser(user_id, cachedPhotosObject);
        }
        else {
            InstagramService.getRecentUserMedia(user_id, max_id).then((res) => {
                if (res.length > 0) {
                    this.setState({
                        media: this.state.media.concat(res),
                        max_id: res[res.length-1].id,
                        user_id: user_id
                    });
                }
                else {
                    $(window).off('scroll');
                }
            });          
        }

    }

    retrieveMorePhotosOnScroll() {
        $(window).off('scroll');
        $(window).on('scroll', () => {
            let scrollPosition = Math.round($(window).scrollTop() + $(window).height()),
                documentHeight = Math.round($(document).height());
            if(scrollPosition == documentHeight) {
                let user_id = this.state.user_id;
                if (Utility.isUserPhotosCached(user_id)) {
                    // Get 20 photos from the cache
                    let cachedPhotosObject = Utility.getCachedPhotosForUser(user_id),
                        cachedPhotos = cachedPhotosObject[2],
                        max_id = cachedPhotosObject[0];

                    console.log("Retrieving from cache!");
                    // Slice from {max_id} to {max_id+20}
                    let new_max_id = max_id + 20,
                        nextPhotoBatch = cachedPhotos.slice(max_id, new_max_id);

                    this.setState({
                        media: this.state.media.concat(nextPhotoBatch),
                        max_id: new_max_id
                    }, () => {
                        cachedPhotosObject[0] = new_max_id;
                        Utility.setCachedPhotosForUser(user_id, cachedPhotosObject);
                    });

                }
                else {
                    this.retrievePhotos(this.state.user_id, this.state.max_id);
                }
            }
        });
    }

    componentDidMount() {
        const that = this,
            user_name = this.props.user_name;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.userInfo.is_private) {
            this.setState(this.initialState);
            this.retrievePhotos(nextProps.userInfo.id);
            this.retrieveMorePhotosOnScroll();
        }
    }

    componentWillUnmount() {
        $(window).off('scroll');
    }

    render() {
        const photos = [];

        this.state.media.forEach(function(media){
            let imageUrl = media.images.low_resolution.url,
                bigImageUrl = media.images.standard_resolution.url,
                likes = media.likes.count,
                caption = media.caption ? media.caption.text : "",
                date = Moment.unix(media.created_time).format("MMM DD YYYY"),
                media_id = media.id;

            photos.push(
                <Photo 
                    imageUrl={imageUrl}
                    likes={likes}
                    caption={caption}
                    media_id={media_id}
                    bigImage={bigImageUrl}
                    date={date}
                />
            );
        });

        return (
            <div className="ms-Grid" > 
                <div className="ms-Grid-row">
                    {photos.map(function(object, i) {
                       return <div key={i}>{object}</div>; 
                     })}
                </div>
            </div>
            );
    }
};