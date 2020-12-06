import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOffer, Offer } from 'app/shared/model/aldiApi/offer.model';
import { OfferService } from './offer.service';
import { IArticle } from 'app/shared/model/aldiApi/article.model';
import { ArticleService } from 'app/entities/aldiApi/article/article.service';

@Component({
  selector: 'jhi-offer-update',
  templateUrl: './offer-update.component.html',
})
export class OfferUpdateComponent implements OnInit {
  isSaving = false;
  articles: IArticle[] = [];
  startDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    advantage: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    startDate: [],
    endDate: [],
    article: [],
  });

  constructor(
    protected offerService: OfferService,
    protected articleService: ArticleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offer }) => {
      this.updateForm(offer);

      this.articleService.query().subscribe((res: HttpResponse<IArticle[]>) => (this.articles = res.body || []));
    });
  }

  updateForm(offer: IOffer): void {
    this.editForm.patchValue({
      id: offer.id,
      advantage: offer.advantage,
      amount: offer.amount,
      startDate: offer.startDate,
      endDate: offer.endDate,
      article: offer.article,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offer = this.createFromForm();
    if (offer.id !== undefined) {
      this.subscribeToSaveResponse(this.offerService.update(offer));
    } else {
      this.subscribeToSaveResponse(this.offerService.create(offer));
    }
  }

  private createFromForm(): IOffer {
    return {
      ...new Offer(),
      id: this.editForm.get(['id'])!.value,
      advantage: this.editForm.get(['advantage'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      startDate: this.editForm.get(['startDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      article: this.editForm.get(['article'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IArticle): any {
    return item.id;
  }
}
