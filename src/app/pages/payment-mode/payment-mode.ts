import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AddPaymentModeDialog } from './add-paymentMode-dailog';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentModeService } from './payment-mode.spec'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-payment-mode',
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './payment-mode.html',
  styleUrl: './payment-mode.scss',
})
export class PaymentMode implements OnInit {

  displayedColumns = ['PaymentModeId', 'PaymentModeEn', 'PaymentModeAr', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<PaymentMode>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private PaymentModeService: PaymentModeService) {}

      ngOnInit() {
      this.loadPaymentModes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }



  loadPaymentModes() {
    this.PaymentModeService.getPaymentModes().subscribe({
      next: (res) => {
        this.dataSource.data = res.data; // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load countries', err);
      }
    });
  }


  openAddPaymentMode() {
      const dialogRef = this.dialog.open(AddPaymentModeDialog, {
        width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false
      });
  
     dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPaymentModes(); // 🔥 RELOAD TABLE DATA
      }
    });
    }
  
    openEditPaymentMode(PaymentModes: PaymentMode) {
    const dialogRef = this.dialog.open(AddPaymentModeDialog, {
       width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
      data: PaymentModes // 🔥 pass selected row
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPaymentModes(); // refresh table
      }
    });
  }
  

}

