import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BankRoutingModule } from "./bank-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// ⬇️ Import the component the tests look for
import { CustomersComponent } from "./components/customer/customer.component";

@NgModule({
  declarations: [
    // ⬇️ Declare it here
    CustomersComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    // (Optional) export if referenced by other modules
    CustomersComponent
  ]
})
export class BankModule {}