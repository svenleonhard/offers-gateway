import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OffersGatewayTestModule } from '../../../../test.module';
import { ArticleComponent } from 'app/entities/aldiApi/article/article.component';
import { ArticleService } from 'app/entities/aldiApi/article/article.service';
import { Article } from 'app/shared/model/aldiApi/article.model';

describe('Component Tests', () => {
  describe('Article Management Component', () => {
    let comp: ArticleComponent;
    let fixture: ComponentFixture<ArticleComponent>;
    let service: ArticleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OffersGatewayTestModule],
        declarations: [ArticleComponent],
      })
        .overrideTemplate(ArticleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Article(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.articles && comp.articles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
