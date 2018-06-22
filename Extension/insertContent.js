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

            callback(tagQuery, topFiveTags);
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

    function showRes(query, topFive) {

        var TopFiveResult = "";
        for (var i in topFive) {
            TopFiveResult += "<li>"+'\"' + topFive[i].value + '\"' + " встречается: " + topFive[i].count + "раз"+"</li>";
        }
        $(".popular-youtube").html(TopFiveResult);
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

    function loadData(domQuery, data) {
        domQuery.prepend(data);

        $(".te-explorer").draggable();

        $(".open-tags").on("click", function () {
            $(".te-explorer").show();
        });

        $(".te-find").on("click", function (e) {
            e.preventDefault();

            $(".search-img-section").hide();
            $(".results").show();

            var searchVal = $(".te-tag-input").val();
            if (searchVal != undefined && searchVal != "") {
                TopFiveTags(searchVal, showRes);

                searchGoogleAutoComplete(searchVal);
                searchGoogleAutoComplete(searchVal, "youtube");
                searchYandexAutoComplete(searchVal);

                relatedTrands(searchVal);
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

        $(".list-element").on("click", function (e) {
            var text = $(this).find(".step");

            if (text.is(":visible")) {
                text.hide();
            }
            else
                text.show();
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

        //var ctx = document.getElementById("myChart").getContext('2d');
        //var myChart = new Chart(ctx, {
        //    type: 'line',
        //    data: {
        //        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
        //        datasets: [{
        //            label:"Популярность",
        //            data: [12, 19, 3, 5, 2, 3],
        //            backgroundColor:  'rgba(255, 99, 132, 0.2)',
        //            borderColor: 'rgba(255,99,132,1)',

        //            borderWidth: 2
        //        }]
        //    },
        //    options: {
        //        scales: {
        //            yAxes: [{
        //                ticks: {
        //                    max: 100,
        //                    min: 0,
        //                    stepSize:20
        //                }
        //            }]
        //        }
        //    }
        //});

    