import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OffersGatewayTestModule } from '../../../../test.module';
import { ArticleUpdateComponent } from 'app/entities/aldiApi/article/article-update.component';
import { ArticleService } from 'app/entities/aldiApi/article/article.service';
import { Article } from 'app/shared/model/aldiApi/article.model';

describe('Component Tests', () => {
  describe('Article Management Update Component', () => {
    let comp: ArticleUpdateComponent;
    let fixture: ComponentFixture<ArticleUpdateComponent>;
    let service: ArticleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OffersGatewayTestModule],
        declarations: [ArticleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ArticleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Article(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Article();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
