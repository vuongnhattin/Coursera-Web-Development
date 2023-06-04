$(() => {
    $("#navbarToggle").blur(() => {
        if (window.innerWidth < 768) {
            $("#collapsable-nav").collapse("hide");
        }
    });
    $("#navbarToggle").click((event) => {
        $(event.target).focus();
    });
});

(function(global) {
    function insertHTML(selector, html) {
        let tmp = document.querySelector(selector);
        tmp.innerHTML += html;
    }
    dc = {};
    document.addEventListener("DOMContentLoaded", (event) => {
        homeHTML = "snippets/home-snippet.html";
        $ajaxUtils.sendGetRequest(homeHTML, (request) => {
            insertHTML("#main-content", request.responseText);
        })
    })

    function replace(string, src, des) {
        src = "{{" + src + "}}";
        string = string.replace(new RegExp(src, "g"), des);
        return string;
    }

    function showLoading (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHTML(selector, html);
      };
      
    dc.loadCategory = () => {
        document.querySelector("#main-content").innerHTML = "";
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest("snippets/category-title.html", (request) => {
            document.querySelector("#main-content").innerHTML = "";
            insertHTML("#main-content", request.responseText);
        })
        $ajaxUtils.sendGetRequest("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json", (request1) => {
            $ajaxUtils.sendGetRequest("snippets/category-item.html", (request2) => {
                let obj = JSON.parse(request1.responseText);
                insertHTML("#main-content", "<section class='row'>");
                for (let i = 0; i < obj.length; i++) {
                    let item = request2.responseText;
                    item = replace(item, "short_name", obj[i].short_name);
                    item = replace(item, "name", obj[i].name);
                    insertHTML("#main-content", "<div class='col-md-3 col-sm-4 col-xs-6'>" + item);

                    insertHTML("#main-content", "</div>");
                }
                insertHTML("#main-content", "</section>");
            })
        })
    }
    global.$dc = dc;
})(window);

