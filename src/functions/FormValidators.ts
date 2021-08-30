import { AbstractControl, FormControl } from "@angular/forms"

export const FormValidators={
    cantBeNegative:(e: AbstractControl | FormControl)=>{
        let val = e.value 
        if(val === null) return null
        else if(val < 0) return {'cantBeNegative': true}
        else return null
    },
}