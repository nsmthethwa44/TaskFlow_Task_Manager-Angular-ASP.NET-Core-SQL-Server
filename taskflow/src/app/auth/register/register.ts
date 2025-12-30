import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit{
registerForm!: FormGroup;
selectedFile: File | null = null;
 @Input() isVisible = false;

  @Output() switchToLogin = new EventEmitter<void>();
  @Output() registered = new EventEmitter<void>();

  onClickLogin() {
    this.switchToLogin.emit();
  }

  closeRegisterForm(){
     this.registered.emit();
  }

constructor(private fb: FormBuilder, private authSer: Auth) {}

ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      image: [null]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formData = new FormData();
    formData.append('Name', this.registerForm.value.name);
    formData.append('Email', this.registerForm.value.email);
    formData.append('Password', this.registerForm.value.password);
    if (this.selectedFile) formData.append('ImageUrl', this.selectedFile);

    Swal.fire({
      title: 'Creating account...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.authSer.register(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'You can now log in.',
          timer: 2000,
          showConfirmButton: false
        });
        this.closeRegisterForm();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: err.error?.message || 'Please try again later.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

}

