﻿$(document).ready(function () {

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

            var topFiveTags = "Гугл Тренды: \n";
            for (let i = 0; i < 5; i++) {
                if (data.length <= i)
                    break;
                topFiveTags += data[i].query + " " + data[i].value + " \n";
            }

            $(".google-trends").html(topFiveTags);
        });
    }

    function showRes(query, topFive) {

        var TopFiveResult = "Топ пять тэгов для " + query + ": \n";
        for (var i in topFive) {
            TopFiveResult += '\"' + topFive[i].value + '\"' + " встречается: " + topFive[i].count + "раз\n";
        }
        $(".res-text").html(TopFiveResult);
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
            resString = "Ютуб предлагает: ";
            container = $(".youtube-auto");
        }
        else if (type == "yandex") {
            resString = "Яндекс предлагает: ";
            container = $(".yandex-auto");
        }
        else {
            resString = "Гугл предлагает: ";
            container = $(".google-auto");
        }

        for (let i in results) {
            resString += results[i]+", ";
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

            var searchVal = $(".te-tag-input").val();

            if (searchVal != undefined && searchVal != "") {
                TopFiveTags(searchVal, showRes);

                searchGoogleAutoComplete(searchVal);
                searchGoogleAutoComplete(searchVal, "youtube");
                searchYandexAutoComplete(searchVal);

                relatedTrands(searchVal);
            }

        });

        $(".close-control").on("click", function () {
            $(".te-explorer").hide();
        });

        $(".js-next-step").on("click", function () {

            var curStep = $(".steps-container").data("curstep");
            
            if (curStep >= 10)
                curStep = 1;
            else
                curStep++;
            $(".steps-container").data("curstep", curStep);

            $(".step").hide();
            $(".step[data-stepnum='" + curStep + "']").show();

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

    