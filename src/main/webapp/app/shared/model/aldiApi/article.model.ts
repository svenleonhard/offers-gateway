import { ArticleCategory } from 'app/shared/model/enumerations/article-category.model';

export interface IArticle {
  id?: number;
  description?: string;
  producer?: string;
  amount?: string;
  category?: ArticleCategory;
  price?: number;
  pictureContentType?: string;
  picture?: any;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public description?: string,
    public producer?: string,
    public amount?: string,
    public category?: ArticleCategory,
    public price?: number,
    public pictureContentType?: string,
    public picture?: any
  ) {}
}
