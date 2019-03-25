define(["sys/models/test-proto", "sys/extensions/String/createElement"], test => {
        
    test(HTMLElement, ["find"]);
    
    HTMLElement.prototype.find = function(search) {
        let e = this.querySelector(search);
        if (!e) {
            e = "dummy".createElement();
            e.length = 0;
            return e;
        }
        e.length = 1;
        return e;
    }
});