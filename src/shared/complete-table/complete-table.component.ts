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
export class CompleteTableComponent implements OnInit {
  fontAwesome = fontAwesome  

  state={
    page: 1,
    search: '',
    limit: 5,
  }
  
  @Input() maxPage?: any

  @Input() hideFilter?: boolean
  @Input() hidePagination?: boolean

  @Output('onClickFilter') onClickFilter = new EventEmitter()

  delaySearchFn: any

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
  ) { 
    this.subscription=this.router.events.subscribe(res=>{
      if(res instanceof NavigationEnd){
        this.fetchStateFromURL()
      }
    })
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe()
  }

  private fetchStateFromURL(){
    let qP = this.activatedRoute.snapshot.queryParams
    this.state.search = qP['search']
    this.state.limit = qP['limit'] || 5

    this.state.page = qP['page'] || 1
    let n = Math.floor((this.state.page-1)/this.pagination.cycle*1.00)
    this.pagination.offset = n*this.pagination.cycle
  }

  ngOnInit(): void {
  }

  clearSearch(){
    this.state.search=null
    this.beginSearch()
  }
  beginSearch(){
    if(this.delaySearchFn) clearTimeout(this.delaySearchFn)
    this.delaySearchFn = setTimeout(()=>{
      this.navigate()
    },500)
  }

  onSelectNewPage(newPage){
    if(newPage == this.state.page) return
    else{
      this.state.page=newPage
      this.navigate()
    }
  }

  onClickF(){
    this.onClickFilter.emit("1")
  }

  onChangePageLength(){
    if(this.state.limit < 1){
      this.state.limit = 1
    }else{
      this.navigate()
    }
  }

  private navigate(){
    let qP = {...this.activatedRoute.snapshot.queryParams, ...this.state}
    if(!qP.search) delete qP.search
    console.log(qP)
    this.router.navigate([
      location.pathname
    ],{
      queryParams: qP
    })
  }

}
