((global) => {
    let ajaxUtils = {};
    ajaxUtils.sendGetRequest = (url, response) => {
        let request = new XMLHttpRequest();
        request.onload = () => response(request);
        request.open("GET", url);
        request.send();
    }
    global.$ajaxUtils = ajaxUtils;
})(window);
