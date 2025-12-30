import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
@Input() isVisible = false;
@Output() switchToRegister = new EventEmitter<void>();
loginForm: FormGroup;

  onClickRegister() {
    this.switchToRegister.emit();
  }

constructor(private fb: FormBuilder, private authSer: Auth){
    this.loginForm = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(5)]]
  })
}

onSubmit(){
   if (this.loginForm.invalid) return;

   Swal.fire({
      title: 'Logging In...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const data = this.loginForm.value

    this.authSer.login(data).subscribe({
        next: (res: any) => this.handleSuccess(res),
          error: () => this.handleError(),
    })
}

 private handleSuccess(res: any): void {
  Swal.fire({
    icon: 'success',
    title: 'Login Successful',
    text: 'You have successfully logged in.',
    timer: 1800,
    showConfirmButton: false
  });

  this.isVisible = false;
}

private handleError(): void {
  setTimeout(() => {
    Swal.fire({
    icon: 'error',
    title: 'Login Failed',
    text: 'Failed to log in.',
    timer: 1800,
    showConfirmButton: false
  });
    }, 3000); // Hide after 3s
}


}
