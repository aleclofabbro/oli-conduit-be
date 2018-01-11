export type ArticleRequest = string;

export type ArticleValue = {
  article: Article
} | string;

export type ArticleError = {
  errors: {
    body: string[];
  }
};

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}