define(["sys/app"], app => {

    const stripScriptTagsInTemplates = true;
    
    return {
        parse: text => {
            if (!stripScriptTagsInTemplates) {
                return text;
            }
            if (text.indexOf("<s") === -1) {
                return text;
            }
            return text.split(/<script>/).join("").split(/<\/script>/).join("");
        }
    }
});
