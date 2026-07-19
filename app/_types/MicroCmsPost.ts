export type MicroCmsPost = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    categories: {id: string; name: string}[],
    thumbnail: {url: string; height: number; width: number}
}

export type MicroCmsPosts = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    categories: {id: string; name: string}[],
    thumbnail: {url: string; height: number; width: number}
}[]