let changeColor = document.getElementById('changeColor');

  /*chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });*/


function TopFiveTags(tagQuery) {
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
                        allTags.push(data.items[0].snippet.tags[i])
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

        alertTopFive(tagQuery, topFiveTags);
        return topFiveTags;
    });
}

changeColor.onclick = function(element) {
	var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, function (tabs) {
        var curTab = tabs[0];

        if (curTab.url.includes("watch?v=")) {
            var url = new URL(curTab.url);
            var v = url.searchParams.get("v");
            if (v != null) {
                $.getJSON('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD8875J05trC_O6hssu5gDTRaM1ImKZEKU&fields=items(snippet(title,description,tags))&part=snippet&id='+v, function (data) {
                    for (var i in data.items[0].snippet.tags) {
                        $("#tags").append("<button class='tagbtn'>" + data.items[0].snippet.tags[i] + "</button>")
                    }
                });

                //chrome.tabs.executeScript({ code: 'testAlert();' });
            }
        }

    });
};

$("#tags").on("click", ".tagbtn", function (e) {

    e.preventDefault();

    TopFiveTags(e.target.innerText);

});

function alertTopFive(query,topFive) {

    var TopFiveResult = "Топ пять тэгов для " + query +": \n"
    for (var i in topFive) {
        TopFiveResult += '\"'+topFive[i].value+'\"' + " встречается: " + topFive[i].count + "раз\n";
    }

    alert(TopFiveResult);
};