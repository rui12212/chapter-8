export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
}

export type Posts = Post[]

export type MultiData = {
    message: string,
    posts: Posts,
}

export type SingleData = {
    message: string,
    post: Post,
}