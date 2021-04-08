export interface RepoModel {
    id: number,
    name: string,
    owner: {
        login: string
    },
    repo_id: number
}

export interface RepoInfos {
    name: string,
    url: string,
    languages: string,
    full_name: string
}