var InstagramService = (function() {
	return {
		getUserInfo: getUserInfo,
		getRecentUserMedia: getRecentUserMedia,
		getComments: getComments
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
})();

module.exports = InstagramService;
