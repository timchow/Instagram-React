const Utility = (() => {
	return {
		getTopNLikers: getTopNLikers
	};

	function getTopNLikers(likers, n) {
		const topLikers = [];

		for (var likes in likers) {
			topLikers.push([likes, likers[likes]]);
		}

		topLikers.sort((a, b) =>  b[1] - a[1]);
		
		return topLikers.slice(0,n);
	}

})();

export default Utility;
