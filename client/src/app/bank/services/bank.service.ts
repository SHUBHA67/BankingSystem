import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Transaction } from "../types/Transaction";
import { Account } from "../types/Account";
import { from, Observable } from "rxjs";
import { Customer } from "../types/Customer";

@Injectable({
  providedIn: "root",
})
export class BankService {
  // private baseUrl = `${environment.apiUrl}`;
  private baseUrl="https://orchardsolveone.lntedutech.com/project/8130/proxy/3000/"

  private authHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  private get<T>(path: string): Observable<T> {
    return from(
      fetch(`${this.baseUrl}${path}`, { headers: this.authHeaders() })
        .then(r => r.json())
    );
  }

  private post<T>(path: string, body: any): Observable<T> {
    return from(
      fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: this.authHeaders(),
        body: JSON.stringify(body),
      }).then(r => r.json())
    );
  }

  private put<T>(path: string, body: any): Observable<T> {
    return from(
      fetch(`${this.baseUrl}${path}`, {
        method: "PUT",
        headers: this.authHeaders(),
        body: JSON.stringify(body),
      }).then(r => r.json())
    );
  }

  private del<T>(path: string): Observable<T> {
    return from(
      fetch(`${this.baseUrl}${path}`, {
        method: "DELETE",
        headers: this.authHeaders(),
      }).then(r => (r.status === 204 ? null : r.json()))
    );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.post<Customer>("/customers", customer);
  }

  getCustomers(): Observable<Customer[]> {
    return this.get<Customer[]>("/customers");
  }

  addAccount(account: Account): Observable<Account> {
    return this.post<Account>("/accounts", account);
  }

  getAccounts(): Observable<Account[]> {
    return this.get<Account[]>("/accounts");
  }

  performTransaction(transaction: Transaction): Observable<Transaction> {
    return this.post<Transaction>("/transactions", transaction);
  }

  getOutstandingBalance(userId: string): Observable<number> {
    return this.get<number>(`/out-standing?userId=${userId}`);
  }

  getAllTranactions(): Observable<Transaction[]> {
    return this.get<Transaction[]>("/transactions");
  }

  getAccountsByUser(userId: string | null): Observable<Account[]> {
    return this.get<Account[]>(`/accounts/user/${userId}`);
  }

  getTransactionByUser(userId: string | null): Observable<Transaction[]> {
    return this.get<Transaction[]>(`/transactions/customer/${userId}`);
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.del(`/customers/${customerId}`);
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.put<Customer>(`/customers/${customer.customerId}`, customer);
  }

  deleteAccount(accountId: number): Observable<any> {
    return this.del(`/accounts/${accountId}`);
  }

  editAccount(account: Account): Observable<Account> {
    return this.put<Account>(`/accounts/${account.accountId}`, account);
  }


  // Aliases used by Dashboard and Account components (day_23+)
  getAllCustomers(): Observable<Customer[]> {
    return this.get<Customer[]>("/customers");
  }

  getAllAccounts(): Observable<Account[]> {
    return this.get<Account[]>("/accounts");
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.get<Customer>(`/customers/${customerId}`);
  }

  getAccountById(accountId: number): Observable<Account> {
    return this.get<Account>(`/accounts/${accountId}`);
  }

  getAllTransactionsByCustomerId(userId: string | null): Observable<any[]> {
    return this.get<any[]>(`/transactions/customer/${userId}`);
  }
}
