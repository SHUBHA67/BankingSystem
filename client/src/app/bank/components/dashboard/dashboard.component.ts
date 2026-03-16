// import { Component, OnInit } from '@angular/core';
// import { BankService } from '../../services/bank.service';
// import { Customer } from '../../types/Customer';
// import { Observable, of } from 'rxjs';
// import { Account } from '../../types/Account';
// import { Transaction } from '../../types/Transaction';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../auth/services/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   customers$: Observable<Customer[]> = of([] as Customer[]);
//   accounts$: Observable<Account[]> | any;
//   transactions$: Observable<Transaction[]> | any;
//   role: String | null = "";
//   userId: number | any;

//   constructor(private bankService: BankService, private router: Router) { }

//   ngOnInit(): void {
//     this.role = localStorage.getItem("role");
//     const strUserId = localStorage.getItem("user_id");

//     this.customers$ = this.bankService.getCustomers();

//     if (this.role === 'USER') {
//       this.accounts$ = this.bankService.getAccountsByUser(strUserId);
//       this.transactions$ = this.bankService.getTransactionByUser(strUserId);
//     } else {
//       this.accounts$ = this.bankService.getAccounts();
//       this.transactions$ = this.bankService.getAllTranactions();
//     }
//   }

//   deteteCustomer(customer: any): void {
//     let conf = confirm("Do You Really Want To Delete Customer");
//     if (conf) {
//       this.bankService.deleteCustomer(customer.customerId).subscribe(
//         () => {
//           alert('Customer deleted successfully.');
//           this.customers$ = this.bankService.getCustomers();
//         },
//         (error) => {
//           console.error('Error deleting customer:', error);
//         }
//       );
//     }
//   }

//   editCustomer(customer: Customer): void {
//     this.router.navigate(['/bank/customer/edit', {
//       customerId: customer.customerId,
//       name: customer.name,
//       email: customer.email,
//       username: customer.username,
//       password: customer.password,
//       role: customer.role
//     }]);
//   }

//   deteteAccount(account: any): void {
//     let conf = confirm("Do You Really Want To Delete Account");
//     if (conf) {
//       this.bankService.deleteAccount(account.accountId).subscribe(
//         () => {
//           alert('Account deleted successfully.');
//           this.accounts$ = this.bankService.getAccounts();
//         },
//         (error) => {
//           console.error('Error deleting account:', error);
//         }
//       );
//     }
//   }

//   editAccount(account: any): void {
//     this.router.navigate(['/bank/account/edit', {
//       accountId: account.accountId,
//       balance: account.balance,
//       customerId: account.customer.customerId,
//       name: account.customer.name,
//       username: account.customer.username,
//       password: account.customer.password,
//       email: account.customer.email,
//       role: account.customer.role
//     }]);
//   }
// }

//-------------------------Day 23-------------------------------------------

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customers: any[] = [];
  accounts: any[] = [];
  transactions: any[] = [];
  role: string | null = "";

  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    if (this.role === 'ADMIN') {
      this.loadAdminData();
    } else {
      this.loadUserData();
    }
  }

  loadAdminData(): void {
    this.bankService.getAllCustomers().subscribe((data: any[]) => {
      this.customers = data;
    });
    this.bankService.getAllAccounts().subscribe((data: any[]) => {
      this.accounts = data;
    });
    this.bankService.getAllTranactions().subscribe((data: any[]) => {
      this.transactions = data;
    });
  }

  loadUserData(): void {
    this.bankService.getAllAccounts().subscribe((data: any[]) => {
      this.accounts = data;
    });
    this.bankService.getAllTranactions().subscribe((data: any[]) => {
      this.transactions = data;
    });
  }

  deleteCustomer(customerId: number): void {
    if (confirm("Do You Really Want To Delete Customer")) {
      this.bankService.deleteCustomer(customerId).subscribe(() => {
        this.loadAdminData();
      });
    }
  }

  deleteAccount(accountId: number): void {
    if (confirm("Do You Really Want To Delete Account")) {
      this.bankService.deleteAccount(accountId).subscribe(() => {
        this.loadAdminData();
      });
    }
  }

  editCustomer(customer: any): void {
    this.router.navigate(['/bank/customer/edit', { customerId: customer.customerId }]);
  }

  editAccount(account: any): void {
    this.router.navigate(['/bank/account/edit', { accountId: account.accountId }]);
  }
}