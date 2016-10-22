var InstagramService = (function() {
	return {
		getUserId: getUserId,
		getUserFullName: getUserFullName,
		getUserProfilePicture: getUserProfilePicture,
		getUserBiography: getUserBiography,
		getRecentUserMedia: getRecentUserMedia,
		getComments: getComments,
		getLikes: getLikes,
		getAllUserMedia: getAllUserMedia
	};

	/* Returns a promise that returns the user id for a given {user_name} */

	function getUserId (user_name) {
		var options = {
			url: '/userInfo',
			data: {
				user_name: user_name
			}
		};

		return $.ajax(options).then(function(res) {
			return res.user.id;
		});
	};

	function getUserFullName (user_name) {
		var options = {
			url: '/userInfo',
			data: {
				user_name: user_name
			}
		};

		return $.ajax(options).then(function(res) {
			return res.user.full_name;
		});
	}

	function getUserProfilePicture (user_name) {
		var options = {
			url: '/userInfo',
			data: {
				user_name: user_name
			}
		};

		return $.ajax(options).then(function(res) {
			return res.user.profile_pic_url;
		});
	}

	function getUserBiography(user_name) {
		var options = {
			url: '/userInfo',
			data: {
				user_name: user_name
			}
		};

		return $.ajax(options).then(function(res) {
			return res.user.biography;
		});
	}

	/* Returns a promise that returns at most 20 media objects for a given {user_id} */

	function getRecentUserMedia (user_id, max_id) {
		var options = {
			url: '/media',
			data: {
				user_id: user_id,
				max_id: max_id
			}
		};

		return $.ajax(options).then(function(res) {
			return res.data;
		});
	};

	/* Returns a promise that returns at most 150 comments for a given {media_id} */

	function getComments (media_id) {
		var options = {
			url: '/comments',
			data: {
				media_id: media_id
			}
		};

		return $.ajax(options).then(function(res) {
			return res.data;
		});
	};

	function getLikes (media_id) {
		var options = {
			url: '/likes',
			data: {
				media_id: media_id
			}
		};

		return $.ajax(options).then(function(res) {
			return res.data;
		});
	}

	/* Returns a promise that returns all media for a given {user_id} */

	function getAllUserMedia (user_id, max_id, _result) {
		var _result = (_result !== undefined) ? _result : [];
		console.log(max_id)
		if (max_id == 'done') {
			return _result;
		}

		return getRecentUserMedia(user_id, max_id).then(function(res) {
			var new_items = res,
				new_max_id = 'done';

			_result = _result.concat(new_items);
			
			
			if (new_items.length > 0) {
				new_max_id = new_items[new_items.length-1].id
			}

			return getAllUserMedia(user_id, new_max_id, _result, new_items);
		});
	}

})();

module.exports = InstagramService;
