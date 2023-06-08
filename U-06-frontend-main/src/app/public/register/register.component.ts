import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.form.valid) {
      const formData = this.form.value;
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      this.publicService.register(data).subscribe(
        (res: any) => {
          this.router.navigate(['/login']);
        },
        (err: any) => {
          console.log('error');
          console.log(err);
        }
      );
    }
  }
}
