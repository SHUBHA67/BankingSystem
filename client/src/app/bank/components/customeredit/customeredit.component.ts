// import { Component, NgModule, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { Customer } from '../../types/Customer';
// import { BankService } from '../../services/bank.service';
// import { ActivatedRoute } from '@angular/router';
 
// @Component({
//   selector: 'app-customeredit',
//   templateUrl: './customeredit.component.html',
//   styleUrls: ['./customeredit.component.scss']
// })
// export class EditCustomerComponent implements OnInit {
 
//   customerForm: FormGroup=this.formBuilder.group({});
//   customerError$: Observable<string>|any;
//   customerSuccess$: Observable<string>|any;
//   isFormSubmitted: boolean = false;
//   customer: Customer|any;
//   selectedValue:string="";
//   items: Array<any> =
//     [{ article: 'User', value: 'User' }, { article: 'Admin', value: 'Admin', defaultSelected: true }];
  
//   constructor(
//     private route: ActivatedRoute,
//     private formBuilder: FormBuilder,
//     private banksService: BankService
//   ) {}
  
//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       // Get the customer data from the route parameter
//       this.customer = params as Customer;
//       this.selectedValue = this.items.filter(a => a.defaultSelected)[0].value;
 
//       console.log(this.customer);
//     });
//     this.customerForm = this.formBuilder.group({
//       name: ["", [Validators.required]],
//       email: ["", [Validators.required]],
//       customerId: ["", [Validators.required]],
//       username: ["", [Validators.required]],
//       password: ["", [Validators.required]],
//       role: ["", [Validators.required]],
 
//     });
//   }
 
//   onSubmit() {
//     this.isFormSubmitted = true;
//     this.customerSuccess$ = of('');
//     this.customerError$ = of('');
//     if (this.customerForm.invalid) {
//       return;
//     } else {
//       const { name, email,customerId,username,password ,role} = this.customerForm.value;
//       const customer: Customer = new Customer({
//         name,
//         email,
//         customerId,
//         username,
//         password,
//         role
//       });
//       this.banksService.editCustomer(customer).subscribe(
//         (res: any) => {
//           this.customerSuccess$ = of('Customer Updated successfully');
//         },
//         (error) => {
//           console.log(error);
//           this.customerError$ = of("Customer Already Exists !!");
//         }
//       );
//     }
//   }
 
// }
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BankService } from "../../services/bank.service";

@Component({
  selector: "app-customeredit",
  templateUrl: "./customeredit.component.html",
})
export class EditCustomerComponent implements OnInit {
  customerForm: FormGroup = this.formBuilder.group({});
  customer: any;
  customerSuccess: string = "";
  customerError: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name:     ["", [Validators.required]],
      email:    ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      role:     ["", [Validators.required]],
    });

    this.route.params.subscribe((params: any) => {
      const customerId = params['customerId'];
      if (customerId) {
        this.bankService.getCustomerById(customerId).subscribe((data: any) => {
          this.customer = data;
          this.customerForm.patchValue({
            name:     data.name,
            email:    data.email,
            username: data.username,
            password: data.password,
            role:     data.role,
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerError = "Please fill out all required fields correctly.";
      return;
    }
    this.bankService.editCustomer({ ...this.customer, ...this.customerForm.value })
      .subscribe(() => {
        this.customerSuccess = "Customer updated successfully";
        this.router.navigate(['/bank']);
      });
  }
}