(function () {

    var 
        element = document.createElement("div"),
        parent = (document.currentScript ? document.currentScript.parentElement : document.getElementById("app"));
        
    element.id = "loading-screen";
    element.style.display = "none";
    element.style.width = "80%";
    element.style["margin-left"] = "10%";
    element.style["margin-right"] = "40%";
    element.style["margin-top"] = "10%";
    element.style["font-family"] = "Arial";
    element.style["font-size"] = "5em";
    parent.appendChild(element);

    element.innerHTML = "Loading...";

    setTimeout(function() {
        element.style.display = "";
    }, 250);

    setTimeout(function() {
        element.innerHTML = "Please update your browser to latest version of Chrome, Firefox or Edge...";
    }, 3000);
})();