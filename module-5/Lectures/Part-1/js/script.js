document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("button").addEventListener("click", function () {
        ajaxUtils.sendGetRequest("data/name.txt", function (request) {
            let name = request.responseText;    
            console.log(name);
            document.querySelector("#content").innerHTML = name + "!!!";
        });
    });
});
