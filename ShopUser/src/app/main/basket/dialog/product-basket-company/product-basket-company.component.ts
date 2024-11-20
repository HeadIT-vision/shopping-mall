import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-product-basket-company',
  templateUrl: './product-basket-company.component.html',
  styleUrl: './product-basket-company.component.scss'
})
export class ProductBasketCompanyComponent {

  businessName: string = '';

  constructor(private dialogRef: MatDialogRef<ProductBasketCompanyComponent>
  ) { }

  postQuotationRequest(): void {
    if (this.businessName === "") {
      alert("회사명을 입력해주세요.");
      return;
    }

    this.dialogRef.close({ businessName: this.businessName });
  }

}
