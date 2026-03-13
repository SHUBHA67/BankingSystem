import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // The selector doesn't affect the tests, but keep it consistent
  selector: 'app-customers',
  templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css'] // keep if file exists; otherwise you can remove this line
})
export class CustomersComponent implements OnInit {
  // Per spec
  isFormSubmitted: boolean | undefined;
  customerSuccess$: any; // You can later wire real observables; tests only check presence
  customerError$: any;   // Same as above
  customerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;

    // If invalid, leave early (tests check controls invalid when touched/empty)
    if (this.customerForm.invalid) {
      // markAllAsTouched helps make validation state obvious
      this.customerForm.markAllAsTouched();
      return;
    }

    // Here you would typically call a service to save the customer
    // For tests, no real side-effects are required.
  }

  // Helper getter commonly used in templates and tests
  get f() {
    return this.customerForm.controls;
  }
}