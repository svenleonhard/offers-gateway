import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IArticle } from 'app/shared/model/aldiApi/article.model';
import { ArticleService } from './article.service';
import { ArticleDeleteDialogComponent } from './article-delete-dialog.component';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
  articles?: IArticle[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected articleService: ArticleService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.articleService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IArticle[]>) => (this.articles = res.body || []));
      return;
    }

    this.articleService.query().subscribe((res: HttpResponse<IArticle[]>) => (this.articles = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInArticles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IArticle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInArticles(): void {
    this.eventSubscriber = this.eventManager.subscribe('articleListModification', () => this.loadAll());
  }

  delete(article: IArticle): void {
    const modalRef = this.modalService.open(ArticleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.article = article;
  }
}
