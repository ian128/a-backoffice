import { Component, Input,Output, EventEmitter, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { fontAwesome } from 'src/const/font-awesome';

@Component({
  selector: 'complete-table',
  templateUrl: './complete-table.component.html',
  styleUrls: ['./complete-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompleteTableComponent implements OnInit, OnChanges {
  fontAwesome = fontAwesome  
  @Input() currentPage?: any
  @Input() maxPage?: any

  @Input() totalItems?: any
  @Input() numberOfDisplayedItems: any

  @Input() hideFilter?: boolean
  @Input() hidePagination?: boolean

  @Output('onSearch') onSearch = new EventEmitter()
  @Output('onPageSelect') onPageSelect = new EventEmitter()
  @Output('onClickFilter') onClickFilter = new EventEmitter()
  @Output('onChangePageLength') onChangePageLength = new EventEmitter()

  delaySearchFn: any

  searchTxt: any

  private subscription: Subscription

  get showTrailingPage(){
    return (this.maxPage - (this.pagination.offset+1) ) > this.pagination.cycle
  }

  pagination={
    offset: null,
    cycle: 5,
    backBatchPage:()=>{
      if(this.pagination.canBackBatchPage()) this.pagination.offset-=this.pagination.cycle
    },
    canBackBatchPage:()=>{
      return this.pagination.offset-this.pagination.cycle >= 0
    },
    nextBatchPage:()=>{
      if(this.pagination.canNextBatchPage()) this.pagination.offset+=this.pagination.cycle
    },
    canNextBatchPage:()=>{
      return (this.pagination.offset+this.pagination.cycle+1) <= this.maxPage
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe()
  }

  updatePaginationState(){
    this.currentPage = this.currentPage || 1
    let n = Math.floor((this.currentPage-1)/this.pagination.cycle*1.00)
    this.pagination.offset = n*this.pagination.cycle
  }

  ngOnChanges(){
    this.updatePaginationState()
  }

  ngOnInit(): void {
    let qP = this.activatedRoute.snapshot.queryParams
    this.searchTxt = qP.search
    this.numberOfDisplayedItems = qP.limit || 5
    
    this.updatePaginationState()
    this.subscription=this.router.events.subscribe(res=>{
      if(res instanceof NavigationEnd){
        this.updatePaginationState()
      }
    })
  }

  beginSearch(){
    if(this.delaySearchFn) clearTimeout(this.delaySearchFn)
    this.delaySearchFn = setTimeout(()=>{
      this.onSearch.emit(this.searchTxt)
    },500)
  }

  selectNewPage(newPage){
    if(newPage == this.currentPage) return

    this.currentPage=newPage
    this.onPageSelect.emit(newPage)

    this.updatePaginationState()
  }

  onClickF(){
    this.onClickFilter.emit("1")
  }

  onChangePagelen(event){
    let va = event.value
    if(va <= 0){
      va = 1
      event.value = va
    }
    this.onChangePageLength.emit(va)
  }
}
