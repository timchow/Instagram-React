var InstagramService = (function() {
	return {
		getUserInfo: getUserInfo,
		getRecentUserMedia: getRecentUserMedia
	};

	function getUserInfo (username) {
		var options = {
			url: "/userInfo",
			data: {
				user: username
			}
		};

		return $.ajax(options);
	};

	function getRecentUserMedia (userId) {
		var options = {
			url: "/media",
			data: {
				userId: userId
			}
		};

		return $.ajax(options);
	};
})();

module.exports = InstagramService;
