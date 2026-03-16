// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { Customer } from '../../types/Customer';
// import { BankService } from '../../services/bank.service';
// import { AuthService } from '../../../auth/services/auth.service';
// // imprt {AuthService}
// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.scss']
// })
// export class CustomersComponent implements OnInit {

//   customerForm: FormGroup=this.formBuilder.group({});
//   customerError$: Observable<string>=of("");
//   customerSuccess$: Observable<string>=of("");
//   isFormSubmitted: boolean = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private banksService: BankService,
//     private   authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.customerForm = this.formBuilder.group({
//       name: ["", [Validators.required]],
//       email: ["", [Validators.required]],
//       username: ["", [Validators.required]],
//       password: ["", [Validators.required]],
//       role:["",[Validators.required]]
//     });
//   }
//   hasSpecialCharacters(inputString:string):boolean {
//     // Define a regular expression for special characters
//     const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

//     // Test if the inputString contains any special characters
//     return specialCharactersRegex.test(inputString);
//   }
//   onSubmit() {
//     this.isFormSubmitted = true;
//     this.customerSuccess$ = of('');
//     this.customerError$ = of('');
//     const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (this.customerForm.invalid) {
//       return;
//     } else {

//       const data= this.customerForm.value;
//       if(data.password.length < 8)
//       {
//         this.customerError$ = of("Password must be of 8 characters");
//         return;
//       }
//       if(this.hasSpecialCharacters(data.username))
//       {
//         this.customerError$ = of("User Name must consist of letter and number only!!");
//         return;
//       }
//       console.log(emailRegex.test(data.email));
//       if(!emailRegex.test(data.email))
//       {
//         this.customerError$ = of("Invalid Email Id!!");
//         return;

//       }
//       // const username = name, password = "abcd1234";
//       const customer: Customer =
//        new Customer(data);

//       ;
//       this.authService.createUser(customer).subscribe(
//         (res: any) => {
//           this.customerSuccess$ = of('Customer created successfully');
//         },
//         (error) => {
//           this.customerError$ = of("Unable to create customer");
//         }
//       );
//     }
//   }

// }

/// Below Day 21-----------------
// import { Component, OnInit } from "@angular/core";
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

// function noSpecialCharacters(control: AbstractControl): ValidationErrors | null {
//   const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
//   if (control.value && specialCharactersRegex.test(control.value)) {
//     return { specialCharacters: true };
//   }
//   return null;
// }

// @Component({
//   selector: "app-customer",
//   templateUrl: "./customer.component.html",
//   styleUrls: ["./customer.component.scss"],
// })
// export class CustomersComponent implements OnInit {
//   customerForm: FormGroup = this.formBuilder.group({});
//   customerError: string = "";
//   customerSuccess: string = "";
//   isFormSubmitted: boolean = false;

//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit(): void {
//     this.customerForm = this.formBuilder.group({
//       name: ["", [Validators.required]],
//       email: ["", [Validators.required]],
//       username: ["", [Validators.required, noSpecialCharacters]],
//       password: ["", [Validators.required]],
//     });
//   }

//   onSubmit(): void {
//     this.isFormSubmitted = true;
//     this.customerError = "";
//     this.customerSuccess = "";

//     if (this.customerForm.invalid) {
//       this.customerError = "Please fill out all required fields correctly.";
//       return;
//     }

//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (!emailRegex.test(this.customerForm.get("email")?.value)) {
//       this.customerError = "Please correct the errors in the form.";
//       return;
//     }

//     this.customerSuccess = "Customer created successfully";
//   }
// }

// ----------------------Day 23 below------------------------

import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { BankService } from "../../services/bank.service";

function noSpecialCharacters(control: AbstractControl): ValidationErrors | null {
  const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  if (control.value && specialCharactersRegex.test(control.value)) {
    return { specialCharacters: true };
  }
  return null;
}

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomersComponent implements OnInit {
  customerForm: FormGroup = this.formBuilder.group({});
  customerError: string = "";
  customerSuccess: string = "";
  isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      username: ["", [Validators.required, noSpecialCharacters]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    this.customerError = "";
    this.customerSuccess = "";

    if (this.customerForm.invalid) {
      this.customerError = "Please fill out all required fields correctly.";
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.customerForm.get("email")?.value)) {
      this.customerError = "Please correct the errors in the form.";
      return;
    }

    this.bankService.addCustomer(this.customerForm.value).subscribe(() => {
      this.customerSuccess = "Customer created successfully";
    });
  }
}
