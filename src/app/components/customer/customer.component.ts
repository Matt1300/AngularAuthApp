import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer-model';
import { MatTableDataSource } from '@angular/material/table';
import { MenuPermission } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-customer',
    standalone: true,
    imports: [MaterialModule, RouterLink],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

    customerList: Customer[] = [];
    displayedColumns: string[] = ['code', 'name', 'email', 'phone', 'creditlimit', 'status', 'action'];
    datasource = new MatTableDataSource<Customer>();
    _permission: MenuPermission = {
        haveview: false,
        haveedit: false,
        havedelete: false,
        haveadd: false,
        code: '',
        name: ''
    };

    constructor(
        private serviceCustomer: CustomerService,
        private userService: UserService,
        private toastr: ToastrService
    ) { }


    ngOnInit() {
        this.LoadCustomer();
        this.SetAccess();
    }

    SetAccess() {
        const rol = localStorage.getItem('userRol');
        if (rol) {
            this.userService.GetMenuPermission(rol, 'customer').subscribe(data => {
                this._permission = data;
            });
        } else {
            console.error('No user role found in localStorage');
        }
    }

    LoadCustomer() {
        this.serviceCustomer.GetAllCustomers().subscribe(data => {
            this.customerList = data;
            this.datasource.data = this.customerList;
        })
    }

    functionEdit(code: string) {
        if (this._permission.haveedit) {
            console.log('Edit ' + code);
        } else {
            this.toastr.error('You do not have permission to edit', 'Access Denied');
        }
    }

    functionDelete(code: string) {
        if (this._permission.havedelete) {
            console.log('Delete ' + code);
        }
        else {
            this.toastr.error('You do not have permission to delete', 'Access Denied');
        }
    }
}
