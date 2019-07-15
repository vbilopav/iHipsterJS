///<reference path="../../../../../../src/ihjs/dev/types/core.d.ts"/>

const fetchGithub = async (url: string) => {
    let response: any;

    if (window.ihjs.queryString.test) {
        
        if (url.startsWith("/search")) {
            response = await(await fetch('test-data/users.json')).json();
            let q = window.ihjs.parseQueryString(url);
            response.items = response.items.slice(Number(q.page)-1, Number(q.page)-1+Number(q.per_page));

        } else if (url.endsWith("repos")) {
    
            response = await(await fetch('test-data/repos.json')).json();
    
        } else if (url.endsWith("followers")) {
    
            response = await(await fetch('test-data/followers.json')).json();

        } else if (url.endsWith("following")) {
    
            response = await(await fetch('test-data/following.json')).json();
    
        } else if (url.endsWith("gists")) {
        
            response = await(await fetch('test-data/gists.json')).json();

        } else if (url.endsWith("starred")) {
        
            response = await(await fetch('test-data/starred.json')).json();
        
        } else if (url.endsWith("subscriptions")) {
            
            response = await(await fetch('test-data/subscriptions.json')).json();

        } else if (url.startsWith("/users")) {
            
            response = await(await fetch('test-data/vbilopav.json')).json();
        }

    } else {

        response = await(await fetch(`https://api.github.com${url}`, {cache: "force-cache"})).json();

        if (response.message) {
            let goodNews = response.message.substring(response.message.indexOf("("), response.message.length);
            response.message = response.message.replace(goodNews, 
            `(But here's the good news: API rate limit can be significantly increased by signing in to your <code>GitHub <img src="assets/github.ico" /></code> account.)`);
        }
    }
    for(let [key, value] of Object.entries(response)) {
        if (!value) {
            response[key] = "";
        }
    }
    return response;
}

export default fetchGithub;