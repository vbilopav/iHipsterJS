(function () {

    var 
        element = document.createElement("div"),
        id = document.currentScript.getAttribute("data-element-id") || "loading-screen",
        parent = document.currentScript.parentElement;
        
    element.id = id;
    element.style.display = "none";
    element.style.width = "100%";
    element.style["margin-left"] = "40%";
    element.style["margin-top"] = "10%";
    element.style["font-family"] = "Arial";
    element.style["font-size"] = "5em";
    parent.appendChild(element);

    var script = document.createElement("script");
    element.innerHTML = "Detecting features...";
    script.async = true;
    script.src = "../shared/feature-detect.js";
    document.head.appendChild(script);

    script.onload = function() {
        for (var feature in Modernizr) {
            if (!Modernizr[feature]) {
                window.location = "/not-supported.html";
                return;
            }
        }
        
        element.innerHTML = "Loading...";

        setTimeout(function() {
            element.style.display = "";
        }, 250);
    };

})();