(function() {

    var 
        key = 'ihjs-demos-theme',
        current = localStorage.getItem(key),
        opposite = function(t) {
            return t === 'dark' ? 'light' : 'dark';
        };

    if (!current) {
        current = "dark";
    };
    
    var css1 = document.createElement("LINK");
    css1.async = true;
    css1.href = "/demos/shared/css/water/" + current + ".css";
    css1.rel = "stylesheet";
    document.head.appendChild(css1);

    var css2 = document.createElement("LINK");
    css2.async = true;
    css2.href = "/demos/shared/prism/" + current + ".css";
    css2.rel = "stylesheet";
    document.head.appendChild(css2);

    css1.onload = function() {

        var wrap = document.createElement("DIV");
        wrap.style.position = "fixed";
        wrap.style.top = 0; 
        wrap.style.right = 0;
    
        document.body.appendChild(wrap);
    
        var btn = document.createElement("BUTTON");
        btn.style.padding = "5px";
        btn.style.fontSize = "0.7em"; 
        btn.style.margin = "10px";
        btn.innerHTML = "switch to " + opposite(current) + " theme";
    
        wrap.appendChild(btn);
        document.body.appendChild(wrap);
    
        btn.addEventListener("click", function() {
            css1.href = css1.href.replace(/dark|light/, function(replaced) { 
                var theme = opposite(replaced);
                btn.innerHTML = "switch to " + opposite(theme) + " theme";
                localStorage.setItem(key, theme);
                return theme; 
            });
            css2.href = css2.href.replace(/dark|light/, function(replaced) { 
                return opposite(replaced);
            });
        });

    };

})();