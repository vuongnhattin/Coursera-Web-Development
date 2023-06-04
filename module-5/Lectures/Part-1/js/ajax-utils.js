(function (global) {
    let ajaxUtils = {};
    ajaxUtils.sendGetRequest = function(requestUrl, responseHandle) {
        let request = new XMLHttpRequest();
        request.onload = function () {
            responseHandle(request);
        }
        request.open("GET", requestUrl);
        request.send();
    }
    global.ajaxUtils = ajaxUtils;
})(window);


