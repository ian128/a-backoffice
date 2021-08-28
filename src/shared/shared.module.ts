import { CommonModule, CurrencyPipe, registerLocaleData } from "@angular/common";
import localeId from '@angular/common/locales/id';
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule} from '@angular/common/http';
import { InvalidFormcontrolTextComponent } from "./invalid-formcontrol-text/invalid-formcontrol-text.component";
import { CompleteTableComponent } from "./complete-table/complete-table.component";
registerLocaleData(localeId, 'id');

const core=[
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
]

const frequentlyUsedComponent=[
  InvalidFormcontrolTextComponent,
  CompleteTableComponent
]

@NgModule({
  declarations:[
    ...frequentlyUsedComponent
  ],
  exports:[
    ...frequentlyUsedComponent,
    ...core
  ],
  imports:[
    ...core,
  ],
  providers:[
    CurrencyPipe,
    { provide: LOCALE_ID, useValue: "id-ID" },
  ]
})

export class SharedModule { }
