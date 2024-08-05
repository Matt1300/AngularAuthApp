import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let toastr = inject(ToastrService);
  if (localStorage.getItem('username') != null) {
    return true;
  } else {
    toastr.warning('Please login to access this page', 'Warning');
    router.navigate(['/login']);
    return false;
  }
};
