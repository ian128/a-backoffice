import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-errors',
  templateUrl: './invalid-formcontrol-text.component.html',
  styleUrls: ['./invalid-formcontrol-text.component.scss']
})
export class InvalidFormcontrolTextComponent implements OnInit, OnDestroy {
  @Input() fControl: FormControl

  formMsg: any={
    'required': "Kolom ini diperlukan",
    'requiredTrue': "Anda harus menyetujui",
    'negative': "Angka tidak boleh negatif",
    'email': "Format alamat email belum benar",
    'wrong_ktp': "KTP harus 16 digit",
  }

  constructor(
  ) { 
  }

  ngOnDestroy(){

  }
  
  ngOnInit(): void {
  }

}
