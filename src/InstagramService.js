var InstagramService = (function() {
	return {
		getUserInfo: getUserInfo,
		getRecentUserMedia: getRecentUserMedia,
		getComments: getComments,
		getAllUserMedia: getAllUserMedia
	};

	function getUserInfo (user_name) {
		var options = {
			url: '/userInfo',
			data: {
				user_name: user_name
			}
		};

		return $.ajax(options);
	};

	function getRecentUserMedia (user_id, max_id) {
		var options = {
			url: '/media',
			data: {
				user_id: user_id,
				max_id: max_id
			}
		};

		return $.ajax(options);
	};

	function getComments (media_id) {
		var options = {
			url: '/comments',
			data: {
				media_id: media_id
			}
		};

		return $.ajax(options);
	};

	function getAllUserMedia (user_id, max_id, _result) {
		var _result = (_result !== undefined) ? _result : [];

		if (max_id == 'done') {
			return _result;
		}

		return getRecentUserMedia(user_id, max_id).then(function(res) {
			var new_items = res.data,
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
