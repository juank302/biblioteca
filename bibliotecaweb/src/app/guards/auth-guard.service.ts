import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router:Router) { }
  canActivate(){    
    const token = localStorage.getItem('jwt');
    if (!token){
      this.router.navigate(['/']);
     
    }
   // this.router.navigate(['/principal']);   
    return true;
  }
  canActivateChild(){
    const token = localStorage.getItem('jwt');
    if (!token){
      this.router.navigate(['/']);
    }
    return true;
  }
  canLoad() {
    const token = localStorage.getItem('jwt');    
    if (token){
      this.router.navigate(['/principal']);
    }
    return true;
  }
}
