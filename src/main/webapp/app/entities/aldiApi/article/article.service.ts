import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IArticle } from 'app/shared/model/aldiApi/article.model';

type EntityResponseType = HttpResponse<IArticle>;
type EntityArrayResponseType = HttpResponse<IArticle[]>;

@Injectable({ providedIn: 'root' })
export class ArticleService {
  public resourceUrl = SERVER_API_URL + 'services/aldiapi/api/articles';
  public resourceSearchUrl = SERVER_API_URL + 'services/aldiapi/api/_search/articles';

  constructor(protected http: HttpClient) {}

  create(article: IArticle): Observable<EntityResponseType> {
    return this.http.post<IArticle>(this.resourceUrl, article, { observe: 'response' });
  }

  update(article: IArticle): Observable<EntityResponseType> {
    return this.http.put<IArticle>(this.resourceUrl, article, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticle[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
