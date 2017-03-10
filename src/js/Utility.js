const Utility = (() => {
	return {
		getTopNLikers: getTopNLikers,
		isUserPhotosCached: isUserPhotosCached,
		getCachedPhotosForUser: getCachedPhotosForUser,
		setCachedPhotosForUser: setCachedPhotosForUser
	};

	function getTopNLikers(likers, n) {
		const topLikers = [];

		for (var likes in likers) {
			topLikers.push([likes, likers[likes]]);
		}

		topLikers.sort((a, b) =>  b[1] - a[1]);
		
		return topLikers.slice(0,n);
	}

	function isUserPhotosCached(user_id) {
		return (window.localStorage[`${user_id}photos`] != null);
	}


	function getCachedPhotosForUser(user_id) {
		return JSON.parse(window.localStorage[`${user_id}photos`]);
	}

	function setCachedPhotosForUser(user_id, photosObject) {
		window.localStorage[`${user_id}photos`] = JSON.stringify(photosObject);
	}

})();

export default Utility;
