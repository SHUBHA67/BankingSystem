// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BankService } from '../../services/bank.service';
// import { Observable, of } from 'rxjs';
// //import { Account } from '../../types/Account';
// import { Account } from '../../types/Account';
// import { Customer } from '../../types/Customer';

// @Component({
//   selector: 'app-account',
//   templateUrl: './account.component.html',
//   styleUrls: ['./account.component.scss']
// })
// export class AccountComponent implements OnInit {
//   customers$: Observable<Customer[]>;
//   accountForm: FormGroup=this.formBuilder.group({});
//   accounts$: Observable<Account[]>=of([] as Account[]);
//   accountError$: Observable<string>=of("");
//   accountSuccess$: Observable<string>=of("");
//   isFormSubmitted: boolean = false;
//   // bankService: BankService;
//   role:string|null="";
//   userId:string|null="";
//   constructor(
//     private formBuilder: FormBuilder,
//     private banksService: BankService
//   ) {

//     this.customers$ = this.banksService.getCustomers();

//   }

//   ngOnInit(): void {
//     this.accountForm = this.formBuilder.group({
//       customer: ["", [Validators.required]],
//       balance: ["", [Validators.required]],
//     });

//   }

//   onSubmit() {
//     this.isFormSubmitted = true;
//     this.accountSuccess$ = of('');
//     this.accountError$ = of('');
//     if (this.accountForm.invalid) {
//       return;
//     } else {
//       const formData= this.accountForm.value;
//       console.log(formData);
//       const account = new Account(formData);
//       this.banksService.addAccount(account).subscribe(
//         (res: any) => {
//           this.accountSuccess$ = of("Account created successfully");
//         },
//         (error) => {
//           this.accountError$ = of("Unable to create account");
//         }
//       );
//     }
//   }

// }

//-------Below Day 20---------

// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// @Component({
//   selector: "app-account",
//   template: `<div></div>`,
// })
// export class AccountComponent implements OnInit {
//   accountForm: FormGroup = this.formBuilder.group({});
//   successMessage: string = "";
//   errorMessage: string = "";
//   customers: any[] = [];

//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit(): void {
//     this.accountForm = this.formBuilder.group({
//       account_id: [null],
//       customer_id: [null],
//       balance: [null, [Validators.min(0)]],
//     });
//   }

//   onSubmit(): void { }

//   loadCustomers(): void { }
// }

//----------Below Day 21---------------------------
// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// @Component({
//   selector: "app-account",
//   templateUrl: "./account.component.html",
//   styleUrls: ["./account.component.scss"],
// })
// export class AccountComponent implements OnInit {
//   accountForm: FormGroup = this.formBuilder.group({});
//   successMessage: string = "";
//   errorMessage: string = "";
//   customers: any[] = [];

//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit(): void {
//     this.accountForm = this.formBuilder.group({
//       accountId: [null, [Validators.required]],
//       customerId: [null],
//       balance: [null, [Validators.min(0)]],
//     });
//   }

//   onSubmit(): void {
//     if (this.accountForm.invalid) {
//       this.errorMessage = "Please fill out all required fields correctly.";
//       return;
//     }
//     this.successMessage = "Account created successfully";
//     this.errorMessage = "";
//   }

//   loadCustomers(): void { }
// }

// --------------------- Below Day 23 ------------------------------

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BankService } from "../../services/bank.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup = this.formBuilder.group({});
  successMessage: string = "";
  errorMessage: string = "";
  customers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService
  ) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      balance: [null, [Validators.min(0)]],
    });
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.bankService.getAllCustomers().subscribe((customers: any[]) => {
      this.customers = customers;
    });
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.successMessage = "";
      return;
    }
    this.bankService.addAccount(this.accountForm.value).subscribe(() => {
      this.successMessage = "Account created successfully";
      this.errorMessage = "";
    });
  }
}