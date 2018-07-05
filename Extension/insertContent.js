var imgUrl = "chrome-extension://ebmbmnmdlbjooahbbkaeiggaebahhjfc/images/";
var smMedium = imgUrl + "sm_md.png";
var smBad = imgUrl + "sm_b.png";
var smGood = imgUrl + "sm_g.png";
var smVeryBad = imgUrl + "sm_vb.png";
var smVeryGood = imgUrl + "sm_vg.png";
var caretDownImg = imgUrl + "caret-down.png";
var caretUpImg = imgUrl + "caret-up.png";

function diamondImg(count) {
    return imgUrl + "d" + count + ".png";
}

$(document).ready(function () {

    function TopFiveTags(tagQuery, callback) {
        $.getJSON('https://www.googleapis.com/youtube/v3/search?key=AIzaSyD8875J05trC_O6hssu5gDTRaM1ImKZEKU&&maxResults=10&q=' + tagQuery + '&part=snippet&type=video', function (data) {

            var allTags = [];
            var allIds = [];
            for (var i in data.items) {
                allIds.push(data.items[i].id.videoId);
            }

            for (let i in allIds) {
                $.ajax({
                    async: false,
                    url: 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD8875J05trC_O6hssu5gDTRaM1ImKZEKU&fields=items(snippet(title,description,tags))&part=snippet&id=' + allIds[i],
                    dataType: "json",
                    success: function (data) {
                        for (var i in data.items[0].snippet.tags) {
                            allTags.push(data.items[0].snippet.tags[i]);
                        }
                    }
                });
            }
            var map = new Map();
            allTags.forEach(a => map.set(a, (map.get(a) || 0) + 1));

            var uniqueKeys = allTags.filter(a => map.get(a) == 1);
            for (let i in uniqueKeys) {
                map.delete(uniqueKeys[i]);
            }

            var notUniqueTags = [];
            map.forEach((val, key) => notUniqueTags.push({ count: val, value: key }));

            for (let i = 0; i < notUniqueTags.length - 1; i++) {
                for (let j = 0; j < notUniqueTags.length - 1; j++) {
                    if (notUniqueTags[j].count < notUniqueTags[j + 1].count) {
                        var buf = { count: notUniqueTags[j + 1].count, value: notUniqueTags[j + 1].value };
                        notUniqueTags[j + 1].count = notUniqueTags[j].count;
                        notUniqueTags[j + 1].value = notUniqueTags[j].value;

                        notUniqueTags[j].count = buf.count;
                        notUniqueTags[j].value = buf.value;
                    }
                }
            }
            var topFiveTags = [];
            for (let i = 0; i < 5; i++) {
                if (notUniqueTags.length <= i)
                    break;
                topFiveTags.push(notUniqueTags[i]);
            }

            var totalResults = data.pageInfo.totalResults;
            callback(tagQuery, topFiveTags, totalResults);

            searchValueStats(tagQuery, totalResults);
        });
    }

    function relatedTrands(query) {
        $.getJSON('https://trendsnodeservice.azurewebsites.net/trends?keyword=' + query , function (data) {

            var topFiveTags = "";
            for (let i = 0; i < 5; i++) {
                if (data.length <= i)
                    break;
                topFiveTags += "<li>" + data[i].query + " " + data[i].value +"</li>";
            }

            $(".google-trends").html(topFiveTags);
        });
    }

    function searchValueStats(query, videoCount) {
        $.getJSON('https://adwordsservice.azurewebsites.net/Stat/ParseKey/?key=' + query + "&videoc=" + videoCount, function (data) {

            var curSVMeter = "";
            var curVideoCMeter = "";
            if (data != null) {

                switch (data.SVQuality) {
                    case 0:
                        curSVMeter = smVeryBad;
                        break;
                    case 1:
                        curSVMeter = smBad;
                        break;
                    case 2:
                        curSVMeter = smMedium;
                        break;
                    case 3:
                        curSVMeter = smGood;
                        break;
                    case 4:
                        curSVMeter = smVeryGood;
                        break;
                }

                switch (data.VideoCountQuality) {
                    case 0:
                        curVideoCMeter = smVeryBad;
                        break;
                    case 1:
                        curVideoCMeter = smBad;
                        break;
                    case 2:
                        curVideoCMeter = smMedium;
                        break;
                    case 3:
                        curVideoCMeter = smGood;
                        break;
                    case 4:
                        curVideoCMeter = smVeryGood;
                        break;
                }

                $(".sv-img-meter").attr("src", curSVMeter);
                $(".videoc-img-meter").attr("src", curVideoCMeter);

                $(".meter-count").html(data.Points);

                if (data.Points >= 0 && data.Points < 25) {
                    $(".meter-count").css("color", "#f00");
                }
                else if (data.Points >= 25 && data.Points < 40) {
                    $(".meter-count").css("color", "#ef7171");
                }
                else if (data.Points >= 40 && data.Points < 60) {
                    $(".meter-count").css("color", "#ffdc28");
                }
                else if (data.Points >= 60 && data.Points < 70) {
                    $(".meter-count").css("color", "#68f1ae");
                }
                else if (data.Points >= 70 && data.Points <= 100) {
                    $(".meter-count").css("color", "#03a958");
                }

                $(".points-exp").html(data.Explanation);
            }

            $(".search-value").find(".meter-count").html(data);

            $(".load-gif-container").hide();
            $(".meters-container").show();
        });
    }

    function showRes(query, topFive, totalResults) {

        var TopFiveResult = "";
        for (var i in topFive) {
            TopFiveResult += "<li>" + '\"' + topFive[i].value + '\"' + " : " + " <img class='diamond-rating' src='" + diamondImg(topFive[i].count) + "'>" + "</li>";
        }
        $(".popular-youtube").html(TopFiveResult);

        $(".search-count").find(".meter-count").html(totalResults);
    }

    function searchGoogleAutoComplete(val,type ="") {

        var xhr = new XMLHttpRequest();
        var url = "https://suggestqueries.google.com/complete/search?client=firefox&q=" + val;

        if (type == "youtube") {
            url += "&ds=yt";
        }
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                displayAC(JSON.parse(this.responseText), type);
            }
        };
        xhr.send();
    }

    function searchYandexAutoComplete(val) {

        var xhr = new XMLHttpRequest();
        var url = "https://suggest.yandex.ru/suggest-ya.cgi?v=4&part=" + val;

        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                displayAC(JSON.parse(this.responseText), "yandex");
            }
        };
        xhr.send();
    }

    function displayAC(acResult, type) {
        var query = acResult[0];

        var results = acResult[1];
        var container;
        var resString;
        if (type == "youtube") {
            resString = "";
            container = $(".youtube-auto");
        }
        else if (type == "yandex") {
            resString = "";
            container = $(".yandex-auto");
        }
        else {
            resString = "";
            container = $(".google-auto");
        }

        for (let i in results) {
            resString += "<li>" + results[i] +"</li>";
        }

        container.html(resString);

    }

    function performSearch() {
        $(".search-img-section").hide();
        $(".results").show();

        $(".meters-container").hide();
        $(".load-gif-container").show();

        var searchVal = $(".te-tag-input").val();
        if (searchVal != undefined && searchVal != "") {
            TopFiveTags(searchVal, showRes);

            searchGoogleAutoComplete(searchVal);
            searchGoogleAutoComplete(searchVal, "youtube");
            searchYandexAutoComplete(searchVal);

            relatedTrands(searchVal);

        }
    }

    function loadData(domQuery, data) {
        domQuery.prepend(data);

        $(".te-explorer").draggable({ handle: ".control-panel" });

        $(".open-tags").on("click", function () {
            $(".te-explorer").show();
        });

        $(".te-find").on("click", function (e) {
            e.preventDefault();

            performSearch();
        });

        $(".te-tag-input").keypress(function (e) {
            if (e.which == 13) {
                performSearch();
            }
        });

        $(".close-control").on("click", function (e) {
            e.preventDefault();

            $(".te-explorer").hide();
        });


        $(".tag-control").on("click", function (e) {
            e.preventDefault();

            $(".section-link").removeClass("active");
            $(this).addClass("active");
            $("#tag-row").show();
            $("#check-list-row").hide();

        });

        $(".check-control").on("click", function (e) {
            e.preventDefault();

            $(".section-link").removeClass("active");
            $(this).addClass("active");
            $("#tag-row").hide();
            $("#check-list-row").show();
        });

        $(".caret-down, .step-title").on("click", function (e) {
            var container = $(this).parent();
            var text = $(container).find(".step");

            if (text.is(":visible")) {
                container.find(".caret-down").attr("src", caretDownImg);
                text.hide();
            }
            else {
                container.find(".caret-down").attr("src", caretUpImg);
                text.show();
            }   
        });
    }

    function tryLoad(content, tries) {
        if (tries > 3)
            return;

        var place = $("#yt-masthead-user");

        if (place.length != 0) {
            loadData(place, content);
        } else {
            tries++;
            setTimeout(tryLoad, 1000, content, tries);
        }
    }

    $.get(chrome.extension.getURL('/tagview.html'), function (data) {
        tryLoad(data, 1);
    });

    
});


    