export interface RepoModel {
    id: number,
    name: string,
    owner: {
        login: string
    },
    repo_id: number
}