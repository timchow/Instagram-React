var InstagramService = (function() {
	return {
		getUserInfo: getUserInfo,
		getRecentUserMedia: getRecentUserMedia
	};

	function getUserInfo (user_name) {
		var options = {
			url: "/userInfo",
			data: {
				user_name: user_name
			}
		};

		return $.ajax(options);
	};

	function getRecentUserMedia (user_id, max_id) {
		var options = {
			url: "/media",
			data: {
				user_id: user_id,
				max_id: max_id
			}
		};

		return $.ajax(options);
	};
})();

module.exports = InstagramService;
