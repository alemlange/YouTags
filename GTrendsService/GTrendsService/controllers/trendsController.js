const googleTrends = require('google-trends-api');
const fetch = require("node-fetch");

const youtubeSearchUrl = 'https://www.googleapis.com/youtube/v3/search';
const youtubeVideoUrl = 'https://www.googleapis.com/youtube/v3/videos';

exports.list_all_tasks = (req, res) => {
    var keyword = req.query.keyword;

    try {
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
    }
    catch (ex) {
        return "Error";
    }
};

exports.youtubeSearch = async (req, res) => {
    const query = req.query.query;

    const searchSettings = 'key=AIzaSyD8875J05trC_O6hssu5gDTRaM1ImKZEKU&maxResults=10&relevanceLanguage=ru&regionCode=ru&part=snippet&type=video';

    try {
        const searchUrl = encodeURI(`${youtubeSearchUrl}?${searchSettings}&q=${query}`);

        const responce = await fetch(searchUrl);
        const data = await responce.json();

        res.json(data);
    }
    catch (ex) {
        throw ex;
    }
};

exports.youtubeVideo = async (req, res) => {
    const id = req.query.id;

    const searchSettings = 'key=AIzaSyD8875J05trC_O6hssu5gDTRaM1ImKZEKU&fields=items(snippet(title,description,tags))&part=snippet';

    try {
        const searchUrl = encodeURI(`${youtubeVideoUrl}?${searchSettings}&id=${id}`);

        const responce = await fetch(searchUrl);
        const data = await responce.json();

        res.json(data);
    }
    catch (ex) {
        throw ex;
    }
};