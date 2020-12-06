import { Moment } from 'moment';
import { IArticle } from 'app/shared/model/aldiApi/article.model';

export interface IOffer {
  id?: number;
  advantage?: number;
  amount?: string;
  startDate?: Moment;
  endDate?: Moment;
  article?: IArticle;
}

export class Offer implements IOffer {
  constructor(
    public id?: number,
    public advantage?: number,
    public amount?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public article?: IArticle
  ) {}
}
