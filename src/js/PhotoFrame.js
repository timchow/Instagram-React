import React from 'react';

import Photo from './Photo';
import InstagramService from './InstagramService';

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

    retrieveMorePhotosOnScroll() {
        $(window).off('scroll');
        $(window).on('scroll', () => {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                this.retrievePhotos(this.state.user_id, this.state.max_id);
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
            let imageUrl = media.images.low_resolution.url;
            let bigImageUrl = media.images.standard_resolution.url;
            let likes = media.likes.count;
            let caption = media.caption ? media.caption.text : "";
            let media_id = media.id;

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
                    {photos.map(function(object, i) {
                       return <div key={i}>{object}</div>; 
                     })}
                </div>
            </div>
            );
    }
};