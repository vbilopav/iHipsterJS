export interface githubCodeRepo { 
    fork: boolean
    stargazers_count: number,
    watchers_count: number,
    description: string
    files: Array<{filename: string, language: string}>
}

export interface githubDetails { 
    login: string,
    id: string,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean,
    name: string,
    company: string,
    blog: string,
    location: string,
    email: string,
    hireable: string,
    bio: string,
    public_repos: number,
    public_gists: number,
    followers: number,
    following: number,
    created_at: string,
    updated_at: string
    message?: string
}

export interface githubSearchItem {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean,
    score: number
}

export interface githubSearchResult {
    total_count: number,
    incomplete_results: boolean,
    items: Array<githubSearchItem>
    message?: string
}

export interface githubResponse extends githubSearchResult, githubDetails, githubCodeRepo, Iterator<githubResponse> {};
