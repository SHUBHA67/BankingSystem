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

  constructor(private bankService: BankService, private router: Router) {}

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
    const userId = localStorage.getItem("user_id");
    this.bankService.getAccountsByUser(userId).subscribe((data: any[]) => {
      this.accounts = data;
    });
    this.bankService.getAllTransactionsByCustomerId(userId).subscribe((data: any[]) => {
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