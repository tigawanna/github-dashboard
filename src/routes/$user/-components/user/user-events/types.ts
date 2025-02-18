export interface Main {
    id:         string;
    type:       string;
    actor:      Actor;
    repo:       MainRepo;
    payload:    Payload;
    public:     boolean;
    created_at: Date;
    org?:       Actor;
}

export interface Actor {
    id:             number;
    login:          Login;
    display_login?: Login;
    gravatar_id:    string;
    url:            string;
    avatar_url:     string;
}

export enum Login {
    Antfu = "antfu",
    AntfuCollective = "antfu-collective",
    Shikijs = "shikijs",
    Unplugin = "unplugin",
}

export interface Payload {
    action?:        string;
    issue?:         Issue;
    comment?:       Comment;
    repository_id?: number;
    push_id?:       number;
    size?:          number;
    distinct_size?: number;
    ref?:           null | string;
    head?:          string;
    before?:        string;
    commits?:       Commit[];
    ref_type?:      string;
    master_branch?: string;
    description?:   null | string;
    pusher_type?:   string;
    number?:        number;
    pull_request?:  PullRequest;
    review?:        Review;
}

export interface Comment {
    url:                      string;
    html_url:                 string;
    issue_url:                string;
    id:                       number;
    node_id:                  string;
    user:                     User;
    created_at:               Date;
    updated_at:               Date;
    author_association:       string;
    body:                     string;
    reactions:                Reactions;
    performed_via_github_app: null;
}

export interface Reactions {
    url:         string;
    total_count: number;
    "+1":        number;
    "-1":        number;
    laugh:       number;
    hooray:      number;
    confused:    number;
    heart:       number;
    rocket:      number;
    eyes:        number;
}

export interface User {
    login:               string;
    id:                  number;
    node_id:             string;
    avatar_url:          string;
    gravatar_id:         string;
    url:                 string;
    html_url:            string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    starred_url:         string;
    subscriptions_url:   string;
    organizations_url:   string;
    repos_url:           string;
    events_url:          string;
    received_events_url: string;
    type:                Type;
    user_view_type:      UserViewType;
    site_admin:          boolean;
}

export enum Type {
    Organization = "Organization",
    User = "User",
}

export enum UserViewType {
    Public = "public",
}

export interface Commit {
    sha:      string;
    author:   Author;
    message:  string;
    distinct: boolean;
    url:      string;
}

export interface Author {
    email: Email;
    name:  Name;
}

export enum Email {
    Anthonyfu117HotmailCOM = "anthonyfu117@hotmail.com",
    GithubAntfuMe = "github@antfu.me",
    ReleaseCovoluteCOM = "release@covolute.com",
    The33807338AzabroflovskiUsersNoreplyGithubCOM = "33807338+azabroflovski@users.noreply.github.com",
    The6752572WebdiscusUsersNoreplyGithubCOM = "6752572+webdiscus@users.noreply.github.com",
    VojtasekTomasSeznamCz = "vojtasek.tomas@seznam.cz",
}

export enum Name {
    AnthonyFu = "Anthony Fu",
    Azabroflovski = "azabroflovski",
    Covolute = "Covolute",
    TomášVojtášek = "Tomáš Vojtášek",
    Webdiscus = "webdiscus",
}

export interface Issue {
    url:                      string;
    repository_url:           string;
    labels_url:               string;
    comments_url:             string;
    events_url:               string;
    html_url:                 string;
    id:                       number;
    node_id:                  string;
    number:                   number;
    title:                    string;
    user:                     User;
    labels:                   any[];
    state:                    string;
    locked:                   boolean;
    assignee:                 null;
    assignees:                any[];
    milestone:                null;
    comments:                 number;
    created_at:               Date;
    updated_at:               Date;
    closed_at:                Date;
    author_association:       string;
    sub_issues_summary:       SubIssuesSummary;
    active_lock_reason:       null;
    body:                     string;
    reactions:                Reactions;
    timeline_url:             string;
    performed_via_github_app: null;
    state_reason:             string;
}

export interface SubIssuesSummary {
    total:             number;
    completed:         number;
    percent_completed: number;
}

export interface PullRequest {
    url:                    string;
    id:                     number;
    node_id:                string;
    html_url:               string;
    diff_url:               string;
    patch_url:              string;
    issue_url:              string;
    number:                 number;
    state:                  string;
    locked:                 boolean;
    title:                  string;
    user:                   User;
    body:                   string;
    created_at:             Date;
    updated_at:             Date;
    closed_at:              Date | null;
    merged_at:              Date | null;
    merge_commit_sha:       string;
    assignee:               null;
    assignees:              any[];
    requested_reviewers:    any[];
    requested_teams:        any[];
    labels:                 any[];
    milestone:              null;
    draft:                  boolean;
    commits_url:            string;
    review_comments_url:    string;
    review_comment_url:     string;
    comments_url:           string;
    statuses_url:           string;
    head:                   Base;
    base:                   Base;
    _links:                 PullRequestLinks;
    author_association:     string;
    auto_merge:             null;
    active_lock_reason:     null;
    merged?:                boolean;
    mergeable?:             null;
    rebaseable?:            null;
    mergeable_state?:       string;
    merged_by?:             User;
    comments?:              number;
    review_comments?:       number;
    maintainer_can_modify?: boolean;
    commits?:               number;
    additions?:             number;
    deletions?:             number;
    changed_files?:         number;
}

export interface PullRequestLinks {
    self:            Comments;
    html:            Comments;
    issue:           Comments;
    comments:        Comments;
    review_comments: Comments;
    review_comment:  Comments;
    commits:         Comments;
    statuses:        Comments;
}

export interface Comments {
    href: string;
}

export interface Base {
    label: string;
    ref:   string;
    sha:   string;
    user:  User;
    repo:  BaseRepo;
}

export interface BaseRepo {
    id:                          number;
    node_id:                     string;
    name:                        string;
    full_name:                   string;
    private:                     boolean;
    owner:                       User;
    html_url:                    string;
    description:                 string;
    fork:                        boolean;
    url:                         string;
    forks_url:                   string;
    keys_url:                    string;
    collaborators_url:           string;
    teams_url:                   string;
    hooks_url:                   string;
    issue_events_url:            string;
    events_url:                  string;
    assignees_url:               string;
    branches_url:                string;
    tags_url:                    string;
    blobs_url:                   string;
    git_tags_url:                string;
    git_refs_url:                string;
    trees_url:                   string;
    statuses_url:                string;
    languages_url:               string;
    stargazers_url:              string;
    contributors_url:            string;
    subscribers_url:             string;
    subscription_url:            string;
    commits_url:                 string;
    git_commits_url:             string;
    comments_url:                string;
    issue_comment_url:           string;
    contents_url:                string;
    compare_url:                 string;
    merges_url:                  string;
    archive_url:                 string;
    downloads_url:               string;
    issues_url:                  string;
    pulls_url:                   string;
    milestones_url:              string;
    notifications_url:           string;
    labels_url:                  string;
    releases_url:                string;
    deployments_url:             string;
    created_at:                  Date;
    updated_at:                  Date;
    pushed_at:                   Date;
    git_url:                     string;
    ssh_url:                     string;
    clone_url:                   string;
    svn_url:                     string;
    homepage:                    string;
    size:                        number;
    stargazers_count:            number;
    watchers_count:              number;
    language:                    null | string;
    has_issues:                  boolean;
    has_projects:                boolean;
    has_downloads:               boolean;
    has_wiki:                    boolean;
    has_pages:                   boolean;
    has_discussions:             boolean;
    forks_count:                 number;
    mirror_url:                  null;
    archived:                    boolean;
    disabled:                    boolean;
    open_issues_count:           number;
    license:                     License;
    allow_forking:               boolean;
    is_template:                 boolean;
    web_commit_signoff_required: boolean;
    topics:                      string[];
    visibility:                  UserViewType;
    forks:                       number;
    open_issues:                 number;
    watchers:                    number;
    default_branch:              string;
}

export interface License {
    key:     string;
    name:    string;
    spdx_id: string;
    url:     string;
    node_id: string;
}

export interface Review {
    id:                 number;
    node_id:            string;
    user:               User;
    body:               null;
    commit_id:          string;
    submitted_at:       Date;
    state:              string;
    html_url:           string;
    pull_request_url:   string;
    author_association: string;
    _links:             ReviewLinks;
}

export interface ReviewLinks {
    html:         Comments;
    pull_request: Comments;
}

export interface MainRepo {
    id:   number;
    name: string;
    url:  string;
}
