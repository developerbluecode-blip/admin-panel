import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentStatusService } from './payment-status.spec';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddPaymentStatusDialog } from './add-paymentStatus-dailog';

@Component({
  selector: 'app-payment-status',
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './payment-status.html',
  styleUrl: './payment-status.scss',
})
export class PaymentStatus implements OnInit {

  displayedColumns = ['PaymentStatusId', 'PaymentStatusEn', 'PaymentStatusAr', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<PaymentStatus>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private PaymentStatusService: PaymentStatusService) {}

      ngOnInit() {
      this.loadPaymentStatuss();
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



  loadPaymentStatuss() {
    this.PaymentStatusService.getPaymentStatuss().subscribe({
      next: (res) => {
        this.dataSource.data = res.data; // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load countries', err);
      }
    });
  }


  openAddPaymentStatus() {
      const dialogRef = this.dialog.open(AddPaymentStatusDialog, {
        width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false
      });
  
     dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPaymentStatuss(); // 🔥 RELOAD TABLE DATA
      }
    });
    }
  
    openEditPaymentStatus(PaymentStatuss: PaymentStatus) {
    const dialogRef = this.dialog.open(AddPaymentStatusDialog, {
       width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
      data: PaymentStatuss // 🔥 pass selected row
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPaymentStatuss(); // refresh table
      }
    });
  }
  

}
