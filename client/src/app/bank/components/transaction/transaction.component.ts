import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BankService } from "../../services/bank.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup = this.formBuilder.group({});
  accounts: any[] = [];
  role: string | null = "";
  userId: string | null = "";
  transactionError: string | undefined;
  transactionSuccess: string | undefined;
  isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.userId = localStorage.getItem("user_id");

    this.transactionForm = this.formBuilder.group({
      accounts:        [null, [Validators.required]],
      amount:          [null, [Validators.required, Validators.min(0)]],
      transactionType: [null, [Validators.required]],
    });

    if (this.role === "USER") {
      this.bankService.getAccountsByUser(this.userId).subscribe((data: any[]) => {
        this.accounts = data;
      });
    }
  }

  onSubmit(): void {
    this.isFormSubmitted = true;

    if (this.transactionForm.invalid) {
      // leave transactionError and transactionSuccess as undefined
      return;
    }

    this.transactionError = "";
    this.transactionSuccess = "";

    this.bankService.performTransaction(this.transactionForm.value).subscribe(
      () => {
        this.transactionSuccess = "Transaction performed successfully";
        this.transactionError = "";
      },
      (err: any) => {
        this.transactionError = err.error;
        this.transactionSuccess = "";
      }
    );
  }
}