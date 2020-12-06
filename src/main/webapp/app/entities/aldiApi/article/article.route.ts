import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IArticle, Article } from 'app/shared/model/aldiApi/article.model';
import { ArticleService } from './article.service';
import { ArticleComponent } from './article.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleUpdateComponent } from './article-update.component';

@Injectable({ providedIn: 'root' })
export class ArticleResolve implements Resolve<IArticle> {
  constructor(private service: ArticleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArticle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((article: HttpResponse<Article>) => {
          if (article.body) {
            return of(article.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Article());
  }
}

export const articleRoute: Routes = [
  {
    path: '',
    component: ArticleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'offersGatewayApp.aldiApiArticle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ArticleDetailComponent,
    resolve: {
      article: ArticleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'offersGatewayApp.aldiApiArticle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ArticleUpdateComponent,
    resolve: {
      article: ArticleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'offersGatewayApp.aldiApiArticle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ArticleUpdateComponent,
    resolve: {
      article: ArticleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'offersGatewayApp.aldiApiArticle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
