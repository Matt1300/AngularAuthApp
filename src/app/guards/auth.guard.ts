import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route) => {
  let router = inject(Router);
  let toastr = inject(ToastrService);
  let service = inject(UserService)

  let menuName = ''
  if (route.url.length > 0) {
    menuName = route.url[0].path
  }

  if (localStorage.getItem('username') != null) {
    let userRole = localStorage.getItem('userRol') as string
    if (menuName != '') {
      service.GetMenuPermission(userRole, menuName).subscribe(data => {
        if (data.haveview) {
          return true
        } else {
          toastr.warning('Unauthorized', 'Denied');
          router.navigate(['/']);
          return false
        }
      })
      return true
    } else {
      return true
    }


  } else {
    toastr.warning('Please login to access this page', 'Warning');
    router.navigate(['/login']);
    return false;
  }
};
