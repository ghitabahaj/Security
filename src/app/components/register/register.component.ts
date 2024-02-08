import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  handleRegister() {
    const userData = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      password: this.password
    };

   
    this.http.post<any>('http://localhost:8080/api/v1/auth/register', userData).subscribe(
      (response) => {
      
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error(error);
     
      }
    );
  }
}
