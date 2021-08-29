import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sort-column',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.scss']
})
export class SortColumnComponent implements OnInit, OnDestroy {
  @Input() fieldName: string

  sortState: 'asc' | 'desc' | null
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.urlSubs = this.router.events.subscribe((res)=>{
      if(res instanceof NavigationEnd){
        let {sortBy, sort} = this.activatedRoute.snapshot.queryParams
        if(!sortBy) this.sortState = null
        else{
          if(sortBy == this.fieldName) this.sortState = sort
          else this.sortState = null
        }
      }
    })
  }
  
  urlSubs: Subscription

  ngOnDestroy(){
    if(this.urlSubs) this.urlSubs.unsubscribe()
  }
  ngOnInit(): void {

  }

  switchMode(nextSortMode){
    let qP = {...this.activatedRoute.snapshot.queryParams}

    if(nextSortMode === null){
        delete qP['sortBy']
        delete qP['sort']
    }
    else{
        qP['sortBy'] = this.fieldName
        qP['sort'] = nextSortMode
    }
    this.router.navigate([location.pathname],{
        queryParams: qP
    })
}

}
