import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'article',
        loadChildren: () => import('./aldiApi/article/article.module').then(m => m.AldiApiArticleModule),
      },
      {
        path: 'offer',
        loadChildren: () => import('./aldiApi/offer/offer.module').then(m => m.AldiApiOfferModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class OffersGatewayEntityModule {}
