import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OffersGatewayTestModule } from '../../../../test.module';
import { OfferDetailComponent } from 'app/entities/aldiApi/offer/offer-detail.component';
import { Offer } from 'app/shared/model/aldiApi/offer.model';

describe('Component Tests', () => {
  describe('Offer Management Detail Component', () => {
    let comp: OfferDetailComponent;
    let fixture: ComponentFixture<OfferDetailComponent>;
    const route = ({ data: of({ offer: new Offer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OffersGatewayTestModule],
        declarations: [OfferDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OfferDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfferDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load offer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.offer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
