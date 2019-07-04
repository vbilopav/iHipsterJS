(function() {

    var 
        key = 'simple-github-browser-theme',
        current = localStorage.getItem(key),
        opposite = function(t) {
            return t === 'dark' ? 'light' : 'dark';
        };

    if (!current) {
        current = "dark";
    };
    
    var css = document.createElement("LINK");
    css.async = true;
    css.href = current + ".css";
    css.rel = "stylesheet";
    document.head.appendChild(css);

    window.onload = function() {

        var wrap = document.createElement("DIV");
        wrap.style.position = "fixed";
        wrap.style.top = 0; 
        wrap.style.right = 0;
    
        document.body.appendChild(wrap);
    
        var btn = document.createElement("BUTTON");
        btn.style.padding = "5px";
        btn.style.fontSize = "0.7em"; 
        btn.style.margin = "8px";
        btn.style.padding = "4px";
        btn.innerHTML = opposite(current) + " theme";
    
        wrap.appendChild(btn);
        document.body.appendChild(wrap);
    
        btn.addEventListener("click", function() {
            css.href = css.href.replace(/dark|light/, function(replaced) { 
                var theme = opposite(replaced);
                btn.innerHTML = opposite(theme) + " theme";
                localStorage.setItem(key, theme);
                return theme; 
            });
        });

    };

})();