const googleTrends = require('google-trends-api');

exports.list_all_tasks = function (req, res) {

    var keyword = req.query.keyword;

    if (keyword !== undefined) {
        googleTrends.relatedQueries({ keyword: keyword })
            .then((resString) => {
                var related = JSON.parse(resString);
                var words = related.default.rankedList[0].rankedKeyword;

                res.json(words);
            });
    }
    else {
        res.end("No keywords provided");
    }
};