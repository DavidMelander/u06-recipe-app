import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator } from '@angular/forms';
import {Router} from "@angular/router";
import {PublicService} from "../public.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, public publicService: PublicService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }
  submit() {
    const formData = this.form.getRawValue();
    const data = {
      email: formData.email,
      password: formData.password,
    };
  
    console.log('Before login request', data);
  
    this.publicService.login(data).subscribe((res: any) => {
      console.log('Login response', res);
      const token = res.token;
      const id = res.id;
  
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        this.router.navigate(['/']);
        console.log('Login successful');
      } else {
        console.error('Invalid response format or missing token');
      }
    }, (error: any) => {
      console.error('Login failed', error);
    });
  }
  

}