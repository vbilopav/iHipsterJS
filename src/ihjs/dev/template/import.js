define(["sys/app"], app => {

    const
        preloaded = false,
        searchImport = ".import(",
        searchImportLen = searchImport.length,
        parseImportsAsync = text => new Promise(resolve => {
            if (preloaded) {
                resolve();
            }
            let from = 0, found = [];
            while (from > -1) {
                let index = text.indexOf(searchImport, from)
                if (index === -1) {
                    break;
                }
                index = index + searchImportLen
                from = text.indexOf(")", index);
                if (from !== -1) {
                    found = found.concat(eval("[" + text.substring(index, from) + "]"))
                    if (text.substring(index-11, index-8) === "css") {
                        found = found.map(item => item.startsWith("text!") ? item : "text!" + item);
                    }
                }
            }
            if (found.length) {
                require(found, () => resolve()); 
            } else {
                resolve();
            }
        });

    return {
        parseImportsAsync: parseImportsAsync
    }
});
