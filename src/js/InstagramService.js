const InstagramService = (() => {
	return {
		getUserInfo: getUserInfo,
		getRecentUserMedia: getRecentUserMedia,
		getAllUserMediaLikes: getAllUserMediaLikes,
		getComments: getComments,
		getLikes: getLikes,
		getAllUserMedia: getAllUserMedia
	};

	function getUserInfo (user_name) {
		const options = {
			url: '/userInfo',
			data: {
				user_name: user_name
			}
		};

		return $.ajax(options).then((res) => {
			return res.user;
		}, (e) => {
			alert("User not found!");
			return e;
		})
	};

	/* Returns a promise that returns at most 20 media objects for a given {user_id} */

	function getRecentUserMedia (user_id, max_id) {
		const options = {
			url: '/media',
			data: {
				user_id: user_id,
				max_id: max_id
			}
		};

		return $.ajax(options).then((res) => {
			return res.data;
		});
	};

	/* Returns a promise that returns at most 150 comments for a given {media_id} */

	function getComments (media_id) {
		const options = {
			url: '/comments',
			data: {
				media_id: media_id
			}
		};

		return $.ajax(options).then((res) => {
			return res.data;
		});
	};

	function getLikes (media_id) {
		const options = {
			url: '/likes',
			data: {
				media_id: media_id
			}
		};

		return $.ajax(options).then((res) => {
			return res.data;
		});
	}

	/* Returns a promise that returns all media for a given {user_id} */

	function getAllUserMedia (user_id, max_id, _result = []) {
		console.log(max_id)
		if (max_id == 'done') {
			return _result;
		}

		return getRecentUserMedia(user_id, max_id).then((res) => {
			let new_items = res,
				new_max_id = 'done';

			_result = _result.concat(new_items);
			
			
			if (new_items.length > 0) {
				new_max_id = new_items[new_items.length-1].id
			}

			return getAllUserMedia(user_id, new_max_id, _result, new_items);
		});
	}

	function getAllUserMediaLikes (user_name) {
		let likers = {};
		return InstagramService.getUserInfo(user_name).then((res) => {
			return InstagramService.getAllUserMedia(res.id).then((res) => {
				let requestArr = [];
				
				requestArr = res.map((photo) => InstagramService.getLikes(photo.id));

				return $.when.apply(this, requestArr).then((...res) => {
					res.forEach((users) => {
						users.forEach((user) => {
							const user_name = user.username;
							likers[user_name] = (likers[user_name] || 0) + 1;
						});				
					});
					return likers;
				});
			});
		});
	}

})();

export default InstagramService;
